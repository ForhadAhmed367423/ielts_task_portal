"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/tasks";
import { isToday, isThisWeek, isThisMonth } from "@/lib/dateFilter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [tasks, setTasks] = useState<any[]>([]);

  const load = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    load();
  }, []);

  const filter = (fn: any) => tasks.filter(fn);

  const data = [
    {
      name: "Today",
      value:
        (filter(isToday).filter((t) => t.completed).length /
          (filter(isToday).length || 1)) *
        100,
    },
    {
      name: "Week",
      value:
        (filter(isThisWeek).filter((t) => t.completed).length /
          (filter(isThisWeek).length || 1)) *
        100,
    },
    {
      name: "Month",
      value:
        (filter(isThisMonth).filter((t) => t.completed).length /
          (filter(isThisMonth).length || 1)) *
        100,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Analytics Dashboard</h1>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}