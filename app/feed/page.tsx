"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/tasks";

export default function Feed() {
  const [tasks, setTasks] = useState<any[]>([]);

  const load = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Community Feed</h1>

      <div className="space-y-3">
        {tasks.map((t) => (
          <div key={t.id} className="border p-3 rounded">
            <h3 className="font-bold">{t.title}</h3>
            <p>{t.description}</p>

            <p
              className={
                t.completed ? "text-green-600" : "text-red-500"
              }
            >
              {t.completed ? "Completed" : "Pending"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}