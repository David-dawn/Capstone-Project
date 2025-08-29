// pages/api/todos/index.js
import { getAllTodos, addTodo } from '../../../lib/store';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const todos = getAllTodos();
    return res.status(200).json(todos);
  }

  if (req.method === 'POST') {
    const { title, completed = false, tag = '' } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newTodo = {
      id: Date.now().toString(),
      title,
      completed,
      tag,
    };

    addTodo(newTodo);
    return res.status(201).json(newTodo);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
