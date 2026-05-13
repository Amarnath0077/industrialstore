import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  updateDoc, 
  query, 
  where, 
  onSnapshot, 
  Timestamp, 
  addDoc,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { Product, CartItem, Order } from './types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const dbService = {
  // Cart Operations
  async addToCart(userId: string | null, product: Product, quantity: number = 1) {
    if (!userId) {
      // Guest Cart (LocalStorage)
      const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
      const existing = guestCart.find((i: any) => i.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        guestCart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          img: product.img || '',
          quantity: quantity,
          brand: product.brand,
          addedAt: new Date().toISOString()
        });
      }
      localStorage.setItem('guest_cart', JSON.stringify(guestCart));
      window.dispatchEvent(new Event('cart_updated'));
      return;
    }

    const path = `users/${userId}/cart/${product.id}`;
    try {
      const cartRef = doc(db, 'users', userId, 'cart', product.id);
      const cartItem: any = {
        userId: userId,
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.img || '',
        quantity: quantity,
        addedAt: serverTimestamp(),
      };
      
      if (product.brand) cartItem.brand = product.brand;
      if (product.link) cartItem.link = product.link;
      if (product.delivery) cartItem.delivery = product.delivery;

      await setDoc(cartRef, cartItem, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async removeFromCart(userId: string | null, productId: string) {
    if (!userId) {
      const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
      const filtered = guestCart.filter((i: any) => i.id !== productId);
      localStorage.setItem('guest_cart', JSON.stringify(filtered));
      window.dispatchEvent(new Event('cart_updated'));
      return;
    }

    const path = `users/${userId}/cart/${productId}`;
    try {
      const cartRef = doc(db, 'users', userId, 'cart', productId);
      await deleteDoc(cartRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  async updateCartQuantity(userId: string | null, productId: string, quantity: number) {
    if (!userId) {
      const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
      const item = guestCart.find((i: any) => i.id === productId);
      if (item) item.quantity = quantity;
      localStorage.setItem('guest_cart', JSON.stringify(guestCart));
      window.dispatchEvent(new Event('cart_updated'));
      return;
    }

    const path = `users/${userId}/cart/${productId}`;
    try {
      const cartRef = doc(db, 'users', userId, 'cart', productId);
      await updateDoc(cartRef, { quantity });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  getCartItems(userId: string | null, callback: (items: CartItem[]) => void) {
    if (!userId) {
      const getItems = () => {
        const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
        callback(guestCart);
      };
      getItems();
      window.addEventListener('cart_updated', getItems);
      return () => window.removeEventListener('cart_updated', getItems);
    }

    const path = `users/${userId}/cart`;
    const cartRef = collection(db, 'users', userId, 'cart');
    const q = query(cartRef);
    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ ...doc.data() } as CartItem));
      callback(items);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
  },

  async mergeCart(userId: string) {
    const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
    if (guestCart.length === 0) return;

    try {
      const batch = writeBatch(db);
      for (const item of guestCart) {
        const cartRef = doc(db, 'users', userId, 'cart', item.id);
        batch.set(cartRef, { ...item, userId, addedAt: serverTimestamp() }, { merge: true });
      }
      await batch.commit();
      localStorage.removeItem('guest_cart');
    } catch (error) {
      console.error("Failed to merge cart", error);
    }
  },

  // Order Operations
  async placeOrder(userId: string, orderData: Omit<Order, 'id' | 'createdAt' | 'userId'>) {
    const ordersPath = 'orders';
    try {
      // 1. Create order
      const ordersRef = collection(db, 'orders');
      const orderDoc = await addDoc(ordersRef, {
        ...orderData,
        userId,
        createdAt: serverTimestamp(),
        status: orderData.status || 'pending'
      });

      // 2. Clear cart in the background to speed up response
      (async () => {
        try {
          const cartRef = collection(db, 'users', userId, 'cart');
          const cartSnapshot = await getDocs(cartRef);
          if (!cartSnapshot.empty) {
            const batch = writeBatch(db);
            cartSnapshot.forEach((doc) => {
              batch.delete(doc.ref);
            });
            await batch.commit();
          }
        } catch (err) {
          console.error("Background cart clearing failed:", err);
        }
      })();

      return orderDoc.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, ordersPath);
      throw error; 
    }
  },

  async getUserOrders(userId: string) {
    const path = 'orders';
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      throw error;
    }
  },

  // Address Operations
  async getAddresses(userId: string) {
    const path = `users/${userId}/addresses`;
    try {
      const addrRef = collection(db, 'users', userId, 'addresses');
      const snapshot = await getDocs(addrRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  async addAddress(userId: string, address: any) {
    const path = `users/${userId}/addresses`;
    try {
      const addrRef = collection(db, 'users', userId, 'addresses');
      const docRef = await addDoc(addrRef, { ...address, isDefault: address.isDefault || false });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async deleteAddress(userId: string, addressId: string) {
    const path = `users/${userId}/addresses/${addressId}`;
    try {
      const addrRef = doc(db, 'users', userId, 'addresses', addressId);
      await deleteDoc(addrRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }
};
