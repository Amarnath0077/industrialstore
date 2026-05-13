import { initializeApp, getApps } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { initializeFirestore, memoryLocalCache } from "firebase/firestore";
import firebaseConfig from '../../firebase-applet-config.json';

// Safety check for firebase config
const isValidConfig = firebaseConfig && firebaseConfig.projectId && firebaseConfig.apiKey && !firebaseConfig.projectId.includes('<');

if (!isValidConfig) {
  console.error("Firebase configuration is missing or contains placeholder values. Please run the set_up_firebase tool.");
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

// Set Auth persistence to local storage explicitly to avoid IndexedDB backing store errors
setPersistence(auth, browserLocalPersistence).catch(err => {
  console.warn("Firebase Auth: Could not set local persistence, falling back to memory.", err);
});

// Use initializeFirestore with memory cache to avoid "Full Disk" or IndexedDB errors in preview environments
const dbId = (firebaseConfig as any).firestoreDatabaseId;
export const db = initializeFirestore(app, {
  localCache: memoryLocalCache()
}, dbId);

// Critical constraint: Test connection on boot
const testConnection = async () => {
  try {
    const { doc, getDocFromServer } = await import('firebase/firestore');
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    if (error?.message?.includes('the client is offline') || error?.message?.includes('database')) {
      console.error("Firebase connection test failed. Database ID:", dbId, error.message);
    }
    // Handle IndexedDB/Storage errors gracefully
    if (error?.message?.includes('quota') || error?.message?.includes('disk') || error?.code === 'failed-precondition') {
      console.warn("Firestore: Persistent storage is disabled or full. Falling back to memory-only cache.");
    }
  }
};
testConnection();

export default app;
