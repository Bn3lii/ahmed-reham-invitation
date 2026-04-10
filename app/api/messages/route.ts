import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Message from "@/lib/models/Message";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 },
      );
    }

    const newMessage = await Message.create({ name, message });

    return NextResponse.json(
      { success: true, data: newMessage },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 },
    );
  }
}
