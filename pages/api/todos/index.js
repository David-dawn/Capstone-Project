import { getAllTodos, addTodo } from "../../../lib/store";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const todos = await getAllTodos();
    return res.status(200).json(todos);
  }

  if (req.method === "POST") {
    const todo = await addTodo(req.body);
    return res.status(201).json(todo);
  }

  res.status(405).end();
}
