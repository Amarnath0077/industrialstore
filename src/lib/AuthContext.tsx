import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';

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

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [signingIn, setSigningIn] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  // AUTH LISTENER
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 5000);

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          try {
            console.log(
              'Auth State:',
              firebaseUser?.uid ||
                'Guest User'
            );

            setUser(firebaseUser);

            setLoading(false);

            setSigningIn(false);

            clearTimeout(timeoutId);

            // Merge cart after login
            if (firebaseUser) {
              try {
                await dbService.mergeCart(
                  firebaseUser.uid
                );
              } catch (mergeError) {
                console.error(
                  'Cart Merge Error:',
                  mergeError
                );
              }
            }
          } catch (err) {
            console.error(
              'Auth Listener Error:',
              err
            );

            setLoading(false);

            setSigningIn(false);
          }
        }
      );

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  // LOGIN
  const login = async () => {
    try {
      setError(null);

      setSigningIn(true);

      const provider =
        new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: 'select_account',
      });

      await signInWithPopup(
        auth,
        provider
      );

    } catch (err: any) {
      console.error(
        'Google Login Error:',
        err
      );

      // SIMPLE CLEAN ERRORS
      if (
        err.code ===
        'auth/popup-blocked'
      ) {
        setError(
          'Popup blocked. Please allow popups.'
        );

      } else if (
        err.code ===
        'auth/popup-closed-by-user'
      ) {
        setError(
          'Popup closed before login completed.'
        );

      } else if (
        err.code ===
        'auth/network-request-failed'
      ) {
        setError(
          'Network error. Check internet connection.'
        );

      } else {
        setError(
          'Unable to sign in right now.'
        );
      }

      setSigningIn(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      setLoading(true);

      await signOut(auth);

      setUser(null);

    } catch (err) {
      console.error(
        'Logout Error:',
        err
      );

    } finally {
      setLoading(false);
    }
  };

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">

          <div className="w-12 h-12 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin"></div>

          <h1 className="text-white text-2xl font-black tracking-tight">
            IndustrialStore
          </h1>

          <p className="text-white/70 text-sm">
            Loading application...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signingIn,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// CUSTOM HOOK
export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}