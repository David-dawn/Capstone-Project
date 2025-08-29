"use client";
import { useEffect, useState } from "react";

export default function TodoForm({ initialData = {}, onSubmit, submitLabel = "Save Task" }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [completed, setCompleted] = useState(initialData.completed || false);
  const [tag, setTag] = useState(initialData.tag || "");

  useEffect(() => {
    if (initialData.title) setTitle(initialData.title);
    if (typeof initialData.completed === "boolean")
      setCompleted(initialData.completed);
  }, [initialData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title can't be empty");
    onSubmit({ title: title.trim(), completed, tag });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl backdrop-blur-lg border border-purple-300/40">
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Task Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 rounded-lg border border-gray-600 dark:border-gray-700" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Tag</label>
        <input value={tag} onChange={e => setTag(e.target.value)} className="w-full p-3 rounded-lg border border-gray-600 dark:border-gray-700" />
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)} className="w-5 h-5 accent-purple-600" />
        <label className="text-sm text-gray-700 dark:text-gray-200 font-medium">Mark as completed</label>
      </div>
      <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold">{submitLabel}</button>
    </form>
  );
}
