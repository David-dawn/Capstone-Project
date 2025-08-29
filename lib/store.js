// lib/store.js
import { db } from "./firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query } from "firebase/firestore";

const todosCollection = collection(db, "todos");

// Initial todos to seed
const initialTodos = [
  { title: "Build Next.js SSR app", completed: false, tag: "Work" },
  { title: "Add dark mode toggle", completed: true, tag: "Personal" },
];

async function seedInitialTodos() {
  const snapshot = await getDocs(todosCollection);
  if (snapshot.empty) {
    for (const todo of initialTodos) {
      await addDoc(todosCollection, todo);
    }
  }
}

export async function getAllTodos() {
  await seedInitialTodos(); // ensure initial todos exist
  const snapshot = await getDocs(todosCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getTodoById(id) {
  const todoDoc = doc(db, "todos", id);
  const snapshot = await getDoc(todoDoc);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function addTodo(todo) {
  const docRef = await addDoc(todosCollection, todo);
  return { id: docRef.id, ...todo };
}

export async function updateTodo(id, updated) {
  const todoDoc = doc(db, "todos", id);
  await updateDoc(todoDoc, updated);
  return { id, ...updated };
}

export async function deleteTodo(id) {
  const todoDoc = doc(db, "todos", id);
  await deleteDoc(todoDoc);
}
