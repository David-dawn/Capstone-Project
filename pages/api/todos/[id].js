import { getTodoById, updateTodo, deleteTodo } from "../../../lib/store";

export default function handler(req, res) {
  const { id } = req.query;
  const todo = getTodoById(id);

  if (req.method === "GET") {
    if (!todo) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(todo);
  }

  if (req.method === "PUT") {
    if (!todo) return res.status(404).json({ message: "Not found" });
    const updated = updateTodo(id, req.body);
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    if (!todo) return res.status(404).json({ message: "Not found" });
    deleteTodo(id);
    return res.status(204).end();
  }

  return res.status(405).json({ message: "Method not allowed" });
}
