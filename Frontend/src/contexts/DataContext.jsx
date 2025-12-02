// src/contexts/DataContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { db, storage, serverTime } from "../firebase";
import {
  collection, addDoc, getDocs, doc, getDoc, query, where,
  orderBy, onSnapshot, updateDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const DataContext = createContext();
export function useData(){ return useContext(DataContext); }

export function DataProvider({children}){
  const [services,setServices] = useState([]);
  const [bookings,setBookings] = useState([]);
  const [loadingServices,setLoadingServices] = useState(true);

  useEffect(()=>{
    const q = query(collection(db,"services"),orderBy("createdAt","desc"));
    const unsub = onSnapshot(q,(snap)=>{
      setServices(snap.docs.map(d=>({id:d.id,...d.data()})));
      setLoadingServices(false);
    });
    return ()=>unsub();
  },[]);

  async function getServiceById(id){
    const d = await getDoc(doc(db,"services",id));
    if(!d.exists()) throw new Error("Service not found");
    return {id:d.id,...d.data()};
  }

  async function addBooking(b){
    const refc = collection(db,"bookings");
    const res = await addDoc(refc,{...b, status:"pending", createdAt:serverTime()});
    return res.id;
  }

  async function getBookingsForUser(uid){
    const q = query(collection(db,"bookings"),where("userId","==",uid),orderBy("createdAt","desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d=>({id:d.id,...d.data()}));
  }

  async function addReviewToService(serviceId, review){
    const refc = collection(db,"reviews");
    await addDoc(refc,{ serviceId, ...review, createdAt:serverTime() });

    const svcRef = doc(db,"services",serviceId);
    const s = await getDoc(svcRef);
    if(s.exists()){
      const d = s.data();
      const prevCount = d.reviewsCount || 0;
      const prevTotal = prevCount*(d.rating||0);
      const newCount = prevCount+1;
      const newRating = (prevTotal + review.rating)/newCount;
      await updateDoc(svcRef,{ reviewsCount:newCount, rating:Math.round(newRating*10)/10 });
    }
  }

  async function getReviewsForService(serviceId){
    const q = query(collection(db,"reviews"),where("serviceId","==",serviceId),orderBy("createdAt","desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d=>({id:d.id,...d.data()}));
  }

  async function uploadServiceImage(file,filename){
    if(!file) return null;
    const storageRef = ref(storage,`serviceImages/${filename||file.name}`);
    const up = await uploadBytes(storageRef,file);
    return await getDownloadURL(up.ref);
  }

  return <DataContext.Provider value={{
    services,loadingServices,getServiceById,
    addBooking,getBookingsForUser,
    addReviewToService,getReviewsForService,
    uploadServiceImage
  }}>{children}</DataContext.Provider>;
}
