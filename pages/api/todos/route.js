import { NextResponse } from "next/server";
import { getAllTodos, addTodo } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getAllTodos(), { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }
    const newTodo = addTodo({
      id: Date.now().toString(),
      title: body.title.trim(),
      completed: Boolean(body.completed),
      tag: body.tag ?? "",
    });
    return NextResponse.json(newTodo, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }
}
