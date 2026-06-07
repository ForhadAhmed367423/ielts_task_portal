import { db } from "./firebase";
import { sendNotification } from "./notifications";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";


export const createTask = async (data: any) => {
  return await addDoc(collection(db, "tasks"), {
    ...data,
    completed: false,
    completionPercent: 0,
    createdAt: Timestamp.now(),
  });
  const docRef = await addDoc(collection(db, "tasks"), {
    ...data,
    completed: false,
    completionPercent: 0,
    createdAt: Timestamp.now(),
  });

  // 🔔 notify user
  await sendNotification({
    userId: data.createdBy,
    message: `New task created: ${data.title}`,
    type: "task",
  });

  return docRef;
};

export const getTasks = async () => {
  const snap = await getDocs(collection(db, "tasks"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const completeTask = async (id: string) => {
  return await updateDoc(doc(db, "tasks", id), {
    completed: true,
    completionPercent: 100,
  });
};

