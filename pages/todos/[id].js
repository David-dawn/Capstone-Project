import { getTodoById } from "../../lib/store";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const todo = getTodoById(params.id);
  if (!todo) return { notFound: true };
  return { props: { todo } };
}

export default function ViewTodo({ todo }) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="glass p-8 rounded-2xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-300">
          {todo.title}
        </h1>

        {todo.tag && (
          <span className="inline-block bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium dark:bg-purple-800 dark:text-white">
            {todo.tag}
          </span>
        )}

        <p
          className={`mt-4 text-lg font-semibold ${
            todo.completed
              ? "text-green-700 dark:text-green-300"
              : "text-yellow-700 dark:text-yellow-300"
          }`}
        >
          Status: {todo.completed ? "Completed ✅" : "Pending ⏳"}
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            href="/"
            className="btn-ghost text-purple-700 dark:text-purple-300"
          >
            ← Back to List
          </Link>
          <Link href={`/edit/${todo.id}`} className="btn-primary">
            Edit Task
          </Link>
        </div>
      </div>
    </main>
  );
}
