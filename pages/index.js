import { getAllTodos } from '@/lib/store';
import TodoList from '@/pages/components/TodoList';



export async function getServerSideProps() {
  const todos = await getAllTodos();
  return { props: { todos } };
}

export default function Home({ todos }) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
      <TodoList todos={todos} />
    </main>
  );
}
