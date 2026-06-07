"use client";

import { useEffect, useState } from "react";
import { getNotifications, markAsRead } from "@/lib/notifications";
import { useAuth } from "@/context/AuthContext";

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);

  const load = async () => {
    if (!user) return;
    const data = await getNotifications(user.uid);
    setNotifications(data);
  };

  useEffect(() => {
    load();
  }, [user]);

  return (
    <div className="p-4 border rounded bg-white/10">
      <h2 className="font-bold mb-2">Notifications</h2>

      {notifications.length === 0 && <p>No notifications</p>}

      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-2 mb-2 rounded ${
            n.read ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          <p>{n.message}</p>

          {!n.read && (
            <button
              className="text-xs underline"
              onClick={async () => {
                await markAsRead(n.id);
                load();
              }}
            >
              mark as read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}