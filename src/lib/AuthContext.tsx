import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signingIn: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const [signingIn, setSigningIn] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // AUTH STATE LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        console.log(
          "Auth State:",
          firebaseUser?.email || "No User"
        );

        setUser(firebaseUser);

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // LOGIN
  const login = async () => {
    try {
      setError(null);

      setSigningIn(true);

      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      await signInWithPopup(auth, provider);

    } catch (err: any) {
      console.error(
        "Google Sign-In Error:",
        err
      );

      // Unauthorized Domain
      if (
        err.code === "auth/unauthorized-domain"
      ) {
        setError(
          "Unauthorized domain. Add your deployed domain in Firebase Authorized Domains."
        );

      // Popup Blocked
      } else if (
        err.code === "auth/popup-blocked"
      ) {
        setError(
          "Popup blocked. Please allow popups."
        );

      // Popup Closed
      } else if (
        err.code === "auth/popup-closed-by-user"
      ) {
        setError(
          "Popup closed before sign in completed."
        );

      // Internal Firebase Error
      } else if (
        err.code === "auth/internal-error"
      ) {
        setError(
          "Firebase internal error. Check Firebase configuration."
        );

      // Generic Error
      } else {
        setError(
          err.message ||
            "Unable to sign in."
        );
      }

    } finally {
      setSigningIn(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await signOut(auth);

      setUser(null);

    } catch (err) {
      console.error(
        "Logout Error:",
        err
      );
    }
  };

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
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">

            <div className="w-12 h-12 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin"></div>

            <h1 className="text-white text-2xl font-bold">
              IndustrialStore
            </h1>

          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

// CUSTOM HOOK
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}