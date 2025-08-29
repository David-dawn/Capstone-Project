import { getAllTodos, addTodo } from "@/lib/store";

export default function handler(req, res) {
  if (req.method === "GET") return res.status(200).json(getAllTodos());

  if (req.method === "POST") {
    const { title, completed = false, tag = "" } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ message: "Title is required" });
    const newTodo = addTodo({ id: Date.now().toString(), title: title.trim(), completed, tag });
    return res.status(201).json(newTodo);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
