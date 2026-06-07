"use client";

import { auth, db, storage } from "@/lib/firebase";

export default function TestFirebasePage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Firebase Connected ✅
      </h1>

      <p className="mt-4">
        Auth: {auth ? "Connected" : "Failed"}
      </p>

      <p>
        Firestore: {db ? "Connected" : "Failed"}
      </p>

      <p>
        Storage: {storage ? "Connected" : "Failed"}
      </p>
    </div>
  );
}