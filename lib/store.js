// lib/store.js
let globalTodos = globalThis.__TODOS__;

if (!globalTodos) {
  globalThis.__TODOS__ = [
    { id: "1", title: "Build Next.js SSR app", completed: false, tag: "Work" },
    { id: "2", title: "Add dark mode toggle", completed: true, tag: "Personal" },
  ];
}

const getStore = () => (globalThis.__TODOS__ = globalThis.__TODOS__ || []);

export function getAllTodos() {
  return getStore();
}

export function getTodoById(id) {
  return getStore().find((t) => t.id === id);
}

export function addTodo(todo) {
  getStore().push(todo);
  return todo;
}

export function updateTodo(id, updated) {
  const todos = getStore();
  const idx = todos.findIndex((t) => t.id === id);
  if (idx !== -1) {
    todos[idx] = { ...todos[idx], ...updated };
    return todos[idx];
  }
  return null;
}

export function deleteTodo(id) {
  globalThis.__TODOS__ = getStore().filter((t) => t.id !== id);
}
