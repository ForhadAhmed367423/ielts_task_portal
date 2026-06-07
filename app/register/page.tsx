"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", userCred.user.uid), {
      email,
      createdAt: new Date(),
    });

    router.push("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow rounded w-80">
        <h1 className="text-xl font-bold mb-4">Register</h1>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="bg-green-500 text-white w-full p-2"
        >
          Register
        </button>
      </div>
    </div>
  );
}