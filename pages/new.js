'use client';

import { useRouter } from 'next/navigation';
import TodoForm from '../pages/components/TodoForm';

export default function NewTodoPage() {
  const router = useRouter();

 const handleCreate = async (payload) => {
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    window.location.href = "/";
  };


  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="glass rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300">Create New Task</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Add a task with optional tag and status.</p>
      </div>
      <TodoForm onSubmit={handleCreate} submitLabel="Create Task" />
    </div>
  );
}
