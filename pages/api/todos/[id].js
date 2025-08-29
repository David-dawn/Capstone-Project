import { getTodoById, updateTodo, deleteTodo } from "../../../lib/store";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const todo = await getTodoById(id);
    if (!todo) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(todo);
  }

  if (req.method === "PUT") {
    const todo = await updateTodo(id, req.body);
    return res.status(200).json(todo);
  }

  if (req.method === "DELETE") {
    await deleteTodo(id);
    return res.status(204).end();
  }

  res.status(405).end();
}
