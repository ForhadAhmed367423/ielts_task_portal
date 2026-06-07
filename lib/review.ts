import { db } from "./firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";

export const addReview = async (data: any) => {
  return await addDoc(collection(db, "reviews"), {
    ...data,
    createdAt: Timestamp.now(),
  });
};

export const getReviews = async () => {
  const snap = await getDocs(collection(db, "reviews"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};