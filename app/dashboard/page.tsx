"use client";

import { useEffect, useState } from "react";
import Notifications from "@/components/Notifications";

import { getTasks, completeTask } from "@/lib/tasks";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);

  const load = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    load();
  }, []);

  const todayTasks = tasks; // simple version (later filter by date)

  const completed = todayTasks.filter((t) => t.completed).length;
  const total = todayTasks.length || 1;

  const percent = Math.round((completed / total) * 100);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
       <div className="p-6">

      <Notifications />
    </div>

      {/* Progress Card */}
      <div className="p-4 rounded bg-gray-100 mb-4">
        <h2 className="text-lg">Today's Progress</h2>
        <p>
          {completed} / {total} = {percent}%
        </p>

        <div className="w-full bg-gray-300 h-3 rounded mt-2">
          <div
            className={`h-3 rounded ${
              percent === 100
                ? "bg-green-500"
                : percent >= 80
                ? "bg-blue-500"
                : percent >= 50
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((t) => (
          <div key={t.id} className="p-3 border rounded flex justify-between">
            <div>
              <h3 className="font-bold">{t.title}</h3>
              <p className="text-sm">{t.description}</p>
            </div>

            <button
              onClick={async () => {
                await completeTask(t.id);
                load();
              }}
              className={`px-3 py-1 rounded text-white ${
                t.completed ? "bg-green-500" : "bg-blue-500"
              }`}
            >
              {t.completed ? "Done" : "Mark Done"}
            </button>
          </div>
        ))}
      </div>
      <div className="p-6">
  <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

  <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
    <h2 className="text-lg">Today Progress</h2>
  </div>
</div>
    </div>
    
    
  );
  
}


