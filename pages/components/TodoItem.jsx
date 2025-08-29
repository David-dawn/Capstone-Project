'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TodoItem({ todo, onDelete }) {
  if (!todo) return null; // ✅ prevent build/runtime crash if todo is undefined

  const [checked, setChecked] = useState(Boolean(todo.completed));

  return (
    <li
      className={`glass rounded-xl p-4 flex items-start justify-between gap-4 border
        ${checked ? 'border-green-400' : 'border-transparent'}`}
    >
      <div className="flex items-start gap-3 min-w-0">
        <input
          type="checkbox"
          className="mt-1 w-5 h-5 accent-purple-600"
          checked={checked}
          onChange={() => setChecked(!checked)}
          aria-label="Mark complete"
        />
        <div className="min-w-0">
          <Link
            href={`/todos/${todo.id}`}
            className={`text-base sm:text-lg font-semibold break-words ${
              checked ? 'line-through text-gray-500' : ''
            } hover:underline`}
            title={todo.title}
          >
            {todo.title || 'Untitled Task'}
          </Link>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
            {todo.tag ? <span className="badge">{todo.tag}</span> : null}
            <span
              className={`px-2 py-0.5 rounded ${
                checked
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'
              }`}
            >
              {checked ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-2">
        <Link href={`/todos/edit/${todo.id}`} className="btn-ghost">
          Edit
        </Link>
        <button
          onClick={() => onDelete(todo.id)}
          className="btn-ghost text-red-500 dark:text-red-400"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
