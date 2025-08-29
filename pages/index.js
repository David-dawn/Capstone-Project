// pages/index.js
import TodoList from "../pages/components/TodoList";
import { getAllTodos } from "../lib/store";

export async function getServerSideProps() {
  const todos = await getAllTodos(); // fetch all todos (including initial ones)
  return { props: { initialTodos: todos } };
}

export default function Home({ initialTodos }) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
      <TodoList initialTodos={initialTodos} />
    </main>
  );
}
