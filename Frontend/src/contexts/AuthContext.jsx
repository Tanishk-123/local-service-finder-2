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
export function useAuth(){ return useContext(AuthContext); }

export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    try{ return JSON.parse(localStorage.getItem("lsf_user")) || null }catch{ return null }
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup({ name, email, password }){
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const u = cred.user;
    if(name) await updateProfile(u, { displayName: name });

    await setDoc(doc(db, "users", u.uid), {
      uid: u.uid,
      email: u.email,
      displayName: name || u.displayName || "",
      role: "user",
      createdAt: serverTime()
    });
    return u;
  }

  async function login({ email, password }){
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  function logout(){ return signOut(auth); }

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async(u)=>{
      if(u){
        const snap = await getDoc(doc(db,"users",u.uid));
        const meta = snap.exists()? snap.data(): null;
        const combined = { uid:u.uid, email:u.email, displayName:u.displayName, meta };
        setUser({ name: combined.displayName||combined.meta?.displayName||"", email: combined.email });
        setCurrentUser(combined);
        localStorage.setItem("lsf_user", JSON.stringify({name:combined.displayName||combined.meta?.displayName||"",email:combined.email}));
      }else{
        setUser(null);
        setCurrentUser(null);
        localStorage.removeItem("lsf_user");
      }
      setLoading(false);
    });
    return unsub;
  },[]);

  return <AuthContext.Provider value={{ user, currentUser, signup, login, logout }}>
    {!loading && children}
  </AuthContext.Provider>;
}
