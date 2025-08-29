'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TodoItem from './TodoItem';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/todos', { cache: 'no-store' });
      const data = await res.json();
      setTodos(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    const prev = todos;
    setTodos(prev.filter(t => t.id !== id)); // optimistic
    const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) {
      // revert on error
      setTodos(prev);
      alert('Failed to delete.');
    }
  };

  if (loading) return <div className="glass rounded-2xl p-6">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/new" className="btn-primary">+ Add Task</Link>
        <button onClick={load} className="btn-ghost">⟳ Refresh</button>
      </div>

      <ul className="space-y-3">
        {todos.length === 0 ? (
          <li className="glass rounded-xl p-6 text-center text-sm text-gray-500 dark:text-gray-400">
            No todos yet — click “Add Task”.
          </li>
        ) : (
          todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
          ))
        )}
      </ul>
    </div>
  );
}
