'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TodoItem from './TodoItem';

export default function TodoList({ initialTodos = [] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [loading, setLoading] = useState(initialTodos.length === 0);

  // Fetch latest todos from API
  const loadTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/todos', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch todos');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialTodos.length === 0) loadTodos();
  }, []);

  // Delete a todo optimistically
  const handleDelete = async (id) => {
    const prev = todos;
    setTodos(prev.filter((t) => t.id !== id));
    const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) {
      setTodos(prev); // revert if delete fails
      alert('Failed to delete.');
    }
  };

  if (loading)
    return <div className="glass rounded-2xl p-6">Loading todos...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/new" className="btn-primary">
          + Add Task
        </Link>
        <button onClick={loadTodos} className="btn-ghost">
          ⟳ Refresh
        </button>
      </div>

      <ul className="space-y-3">
        {todos.length === 0 ? (
          <li className="glass rounded-xl p-6 text-center text-sm text-gray-500 dark:text-gray-400">
            No todos yet — click “Add Task”.
          </li>
        ) : (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
          ))
        )}
      </ul>
    </div>
  );
}
