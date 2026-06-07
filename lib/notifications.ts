import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

export const sendNotification = async (data: any) => {
  return await addDoc(collection(db, "notifications"), {
    ...data,
    read: false,
    createdAt: Timestamp.now(),
  });
};

export const getNotifications = async (userId: string) => {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId)
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const markAsRead = async (id: string) => {
  return await updateDoc(doc(db, "notifications", id), {
    read: true,
  });
};