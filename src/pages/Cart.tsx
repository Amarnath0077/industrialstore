import { ShoppingCart, CheckCircle2, ChevronDown, Trash2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { dbService } from '../lib/dbService';
import { CartItem } from '../lib/types';

export default function Cart() {
  const { user, login, error } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = dbService.getCartItems(user?.uid || null, (cartItems) => {
      setItems(cartItems);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [user]);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleDelete = async (productId: string) => {
    try {
      await dbService.removeFromCart(user?.uid || null, productId);
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  const handleUpdateQty = async (productId: string, qty: number) => {
    try {
      await dbService.updateCartQuantity(user?.uid || null, productId, qty);
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {items.length === 0 ? (
        <div className="bg-surface-container-lowest p-12 border border-outline-variant rounded shadow-sm text-center">
          <ShoppingCart className="w-20 h-20 mx-auto text-outline-variant mb-6" />
          <h1 className="text-3xl font-black mb-4 uppercase tracking-tighter">Your Shopping Cart is empty</h1>
          {!user && (
            <p className="text-on-surface-variant mb-8 max-w-md mx-auto">Sign in to your account to view your saved items and sync your shopping bag across devices.</p>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            {!user && (
              <button 
                onClick={login} 
                className="bg-secondary text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all min-w-[240px]"
              >
                Sign in to your account
              </button>
            )}
            <Link to="/" className="bg-secondary-container px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-md inline-block min-w-[240px]">
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Shopping Cart Content */}
        <div className="flex-1 w-full flex flex-col gap-4">
          <div className="bg-surface-container-lowest p-8 border border-outline-variant rounded shadow-sm">
            <div className="flex justify-between items-end border-b border-outline-variant pb-2 mb-8">
              <h1 className="text-3xl font-bold tracking-tighter">Shopping Cart</h1>
              <span className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">Price</span>
            </div>

            {/* Cart Items */}
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 py-6 border-b border-outline-variant last:border-none">
                  <div className="flex items-start gap-4">
                    <input defaultChecked className="mt-6 h-4 w-4 rounded border-outline focus:ring-secondary-container text-primary" type="checkbox"/>
                    <Link to={item.link || '#'} className="w-40 h-40 bg-surface-container-low flex-shrink-0 flex items-center justify-center p-2 border border-outline-variant rounded overflow-hidden hover:bg-surface-container transition-colors">
                      <img alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply" src={item.img} />
                    </Link>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <Link to={item.link || '#'} className="text-lg font-bold text-primary hover:text-secondary cursor-pointer leading-tight tracking-tight block">
                      {item.title}
                    </Link>
                    <p className="text-xs text-on-surface-variant">by {item.brand || 'IndustrialStore'}</p>
                    <p className="text-xs font-bold text-[#007600] mt-1">In stock</p>
                    <p className="text-xs text-on-surface-variant">Eligible for FREE Shipping</p>
                    
                    <div className="flex items-center gap-4 mt-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-on-surface-variant">Quantity:</span>
                        <div className="relative inline-flex items-center border-2 border-outline-variant rounded-lg bg-surface-container-low px-3 py-1 shadow-sm cursor-pointer hover:border-secondary transition-all group">
                          <select 
                            value={item.quantity}
                            onChange={(e) => handleUpdateQty(item.id, Number(e.target.value))}
                            className="bg-transparent text-sm font-black appearance-none outline-none pr-6 cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                          <ChevronDown className="w-4 h-4 absolute right-1 pointer-events-none text-outline-variant group-hover:text-secondary transition-colors" />
                        </div>
                      </div>
                      <span className="h-6 w-[1px] bg-outline-variant hidden sm:block mx-1"></span>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="flex items-center gap-1.5 text-xs text-error font-bold hover:bg-error-container/20 px-3 py-1.5 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                      <span className="h-6 w-[1px] bg-outline-variant hidden sm:block mx-1"></span>
                      <button className="text-xs text-secondary font-bold hover:underline">Save for later</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right py-6 border-t border-outline-variant mt-4">
              <p className="text-xl font-bold">
                Subtotal ({items.length} items): <span className="text-2xl font-black">${subtotal.toFixed(2)}</span>
              </p>
            </div>
          </div>

          {/* Saved for later - Placeholder for now */}
          <div className="bg-surface-container-lowest p-8 border border-outline-variant rounded shadow-sm mt-4">
            <h2 className="text-xl font-bold border-b border-outline-variant pb-2 mb-8">
              Your Items <span className="text-on-surface-variant text-sm font-normal ml-2 tracking-normal">Saved for later</span>
            </h2>
            <p className="text-sm text-on-surface-variant">You have no saved items.</p>
          </div>
        </div>

        {/* Checkout Sidebar */}
        <aside className="w-full lg:w-80 flex flex-col gap-6 sticky top-28">
          <div className="bg-surface-container-lowest p-6 border border-outline-variant rounded shadow-sm">
            <div className="flex items-start gap-2 text-[#007600] mb-6">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <p className="text-xs font-bold leading-tight">Your order qualifies for FREE Shipping. Choose this option at checkout.</p>
            </div>
            
            <div className="mb-8">
              <p className="text-lg">Subtotal ({items.length} items): <span className="text-2xl font-black block mt-1">${subtotal.toFixed(2)}</span></p>
              <div className="flex items-center gap-2 mt-4">
                <input className="h-4 w-4 rounded border-outline focus:ring-secondary-container text-primary" type="checkbox"/>
                <label className="text-xs font-bold">This order contains a gift</label>
              </div>
            </div>

            <Link 
              to="/checkout"
              className="w-full block text-center py-4 bg-secondary-container text-on-secondary-fixed font-black text-sm rounded shadow-sm hover:brightness-105 active:scale-[0.98] transition-all tracking-widest uppercase"
            >
              Proceed to Checkout
            </Link>
          </div>

          {/* Recommendations */}
          <div className="bg-surface-container p-4 border border-outline-variant rounded shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4 font-bold">Recommended for you</p>
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-surface-container-lowest border border-outline-variant flex-shrink-0 flex items-center justify-center rounded overflow-hidden">
                <img 
                  alt="Work Gloves" 
                  className="max-h-full max-w-full object-contain mix-blend-multiply" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdQKB3HA4_eKS4Gx9DcnyTRugFLN5XPKvdMtuI7D4TTjVL4T1n4sXqGGAa6HQhMkKsVI2nljpkeU2ksYOqitsD_lLYjKQQ-RaWVxEyWev2C0Bh7k_5ICFJYr-Q0pW4X4ugQwOTPfHMiBWg36roSrsu85kyJoW8bFdNqXQzB6aAJwdeqF_BKTRnvdNt3eFFgeLJyqgh9gYNmcG9IICfhq0WJVATBt6WrTdullbMNhtjByFYsqttZxlCBytFJOJriEeTOq5McffQ_1fW" 
                />
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <p className="text-[11px] font-bold text-primary line-clamp-1">Industrial Work Gloves</p>
                <p className="text-base font-black text-primary">$24.99</p>
                <button className="text-[10px] bg-secondary-container px-2 py-1 rounded self-start font-bold uppercase tracking-wider shadow-sm hover:brightness-105 transition-all">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
      )}
    </div>
  );
}
