"use client";

import { useState } from "react";
import { createTask } from "@/lib/tasks";
import { useRouter } from "next/navigation";

export default function Tasks() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {
    await createTask({
      title,
      description,
      createdBy: "user",
    });

    router.push("/dashboard");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Task</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2">
        Create
      </button>
    </div>
  );
}