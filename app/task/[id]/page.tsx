"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTasks } from "@/lib/tasks";
import { addReview, getReviews } from "@/lib/reviews";

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [comment, setComment] = useState("");

  const load = async () => {
    const tasks = await getTasks();
    const t = tasks.find((x: any) => x.id === id);
    setTask(t);

    const rev = await getReviews();
    setReviews(rev.filter((r: any) => r.taskId === id));
  };

  useEffect(() => {
    load();
  }, []);

  const submitReview = async () => {
    await addReview({
      taskId: id,
      reviewerName: "User",
      rating: 5,
      comment,
    });

    setComment("");
    load();
  };

  if (!task) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{task.title}</h1>
      <p className="mb-4">{task.description}</p>

      {/* Reviews */}
      <div className="mt-6">
        <h2 className="font-bold mb-2">Reviews</h2>

        {reviews.map((r) => (
          <div key={r.id} className="border p-2 mb-2">
            ⭐⭐⭐⭐⭐
            <p>{r.comment}</p>
          </div>
        ))}

        <textarea
          className="border w-full p-2 mt-2"
          placeholder="Write review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={submitReview}
          className="bg-green-600 text-white px-4 py-2 mt-2"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}