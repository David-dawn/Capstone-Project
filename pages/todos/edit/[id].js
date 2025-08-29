// pages/todos/edit/[id].jsx
import { getTodoById } from "../../../lib/store";
import TodoForm from "../../components/TodoForm";

export async function getServerSideProps({ params }) {
  const todo = await getTodoById(params.id); 
  if (!todo) return { notFound: true };
  
  // Ensure the object is plain JSON
  return {
    props: { 
      todo: {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        tag: todo.tag || ""
      }
    }
  };
}

export default function EditTodoPage({ todo }) {
  const handleUpdate = async (payload) => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    window.location.href = "/";
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
      <TodoForm initialData={todo} onSubmit={handleUpdate} submitLabel="Update Task" />
    </main>
  );
}
