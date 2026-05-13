import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { dbService } from './dbService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signingIn: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fail-safe: Ensure loading state is eventually resolved
    const timeoutId = setTimeout(() => {
      setLoading(currentLoading => {
        if (currentLoading) {
          console.warn("Auth initialization timed out. Proceeding as guest.");
          return false;
        }
        return currentLoading;
      });
    }, 6000); // 6 seconds timeout

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user?.uid || "No user");
      try {
        // Set user immediately so UI can update
        setUser(user);
        setLoading(false);
        setSigningIn(false);
        clearTimeout(timeoutId);

        if (user) {
          // Merge guest cart items to firestore in the background
          dbService.mergeCart(user.uid).catch(err => {
            console.error("Cart merge failed during auth change", err);
          });
        }
      } catch (err) {
        console.error("Auth state change processing error", err);
        setLoading(false);
        setSigningIn(false);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    setError(null);
    setSigningIn(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("Error signing in with Google", err);
      setSigningIn(false);
      if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized in your Firebase console. Please add this domain to Authorized Domains in Firebase Authentication Settings.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked by your browser. Please allow popups for this site.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        // Just ignore cancelled popups
        setError(null);
      } else {
        setError(err.message || 'An error occurred during sign in.');
      }
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signingIn, error, login, logout }}>
      {loading ? (
        <div className="min-h-screen bg-primary flex items-center justify-center">
           <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-4 border-on-primary/20 border-t-secondary-container rounded-full animate-spin"></div>
             <span className="text-on-primary font-black tracking-tighter text-xl">IndustrialStore</span>
           </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
