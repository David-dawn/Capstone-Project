import { NextResponse } from "next/server";
import { getTodoById, updateTodo, deleteTodo } from "@/lib/store";

export async function GET(_req, { params }) {
  const todo = getTodoById(params.id);
  if (!todo) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(todo, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const updated = updateTodo(params.id, body);
    if (!updated) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }
}

export async function DELETE(_req, { params }) {
  const todo = getTodoById(params.id);
  if (!todo) return NextResponse.json({ message: "Not found" }, { status: 404 });
  deleteTodo(params.id);
  return new NextResponse(null, { status: 204 });
}
