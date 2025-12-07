// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db, serverTime } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lsf_user")) || null;
    } catch {
      return null;
    }
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------- SIGNUP ----------
  async function signup({ name, email, password, role }) {
    // Create user in Firebase Authentication
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const u = cred.user;
    
    // Set the auth displayName so the Cloud Function can copy it into Firestore
    if (name) {
      await updateProfile(u, { displayName: name });
    }

    // Write the initial user document with the selected role immediately.
    // The Cloud Function will merge additional fields (fcmTokens, etc.) but
    // won't overwrite the role since we're using merge:true in the function.
    await setDoc(doc(db, "users", u.uid), {
      uid: u.uid,
      email: u.email,
      displayName: name || "",
      role: role,
      createdAt: serverTime()
    });

    return u;
  }

  // ---------- LOGIN ----------
  async function login({ email, password }) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  // ---------- LOGOUT ----------
  function logout() {
    return signOut(auth);
  }

  // ---------- AUTH STATE LISTENER ----------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        try {
          // Fetch Firestore user document
          const snap = await getDoc(doc(db, "users", u.uid));
          const fsUser = snap.exists() ? snap.data() : {};

          // Merge Firebase Auth + Firestore data
          const finalUser = {
            uid: u.uid,
            email: u.email,
            displayName: u.displayName || fsUser.displayName || "",
            role: fsUser.role || "customer",
            meta: fsUser
          };

          // Lightweight object for localStorage (UI display)
          const stored = {
            name: finalUser.displayName,
            email: finalUser.email,
            role: finalUser.role
          };

          setUser(stored);
          setCurrentUser(finalUser);
          localStorage.setItem("lsf_user", JSON.stringify(stored));
        } catch (err) {
          console.error("Error fetching user document:", err);
          // Fallback to auth-only data if Firestore read fails
          const fallback = {
            uid: u.uid,
            email: u.email,
            displayName: u.displayName || "",
            role: "customer",
            meta: {}
          };
          setUser({ name: fallback.displayName, email: fallback.email, role: "customer" });
          setCurrentUser(fallback);
        }
      } else {
        setUser(null);
        setCurrentUser(null);
        localStorage.removeItem("lsf_user");
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, currentUser, signup, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
} 