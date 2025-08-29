// pages/api/todos/[id].js
import { getTodoById, updateTodo, deleteTodo } from '../../../lib/store';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const todo = getTodoById(id);
    if (!todo) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json(todo);
  }

  if (req.method === 'PUT') {
    const updated = updateTodo(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    deleteTodo(id);
    return res.status(204).end();
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
