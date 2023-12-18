import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json({ success: true, posts });
}

export async function POST(request, response) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({
        success: false,
        error: "You must provide a text to create a post.",
      });
    }
    const textFinder = await prisma.post.findFirst({
      where: {
        text,
      },
    });
    if (textFinder) {
      return NextResponse.json({
        success: false,
        error: "Posts should be unique",
      });
    }
    const post = await prisma.post.create({ data: { text } });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
