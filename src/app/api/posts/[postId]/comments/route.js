import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  try {
    const { postId } = response.params;
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return NextResponse.json({
        success: false,
        error: "No post with that id found",
      });
    }
    const comments = await prisma.comment.findMany({
      where: { postId: postId },
    });
    if (comments.length == 0) {
      return NextResponse.json({
        success: false,
        error: "This post has no comments",
      });
    }
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(request, response) {
  try {
    const { postId } = response.params;
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({
        success: false,
        error: "Enter text to add to comments",
      });
    }
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return NextResponse.json({
        success: false,
        erroe: "No post with that id found",
      });
    }
    const comment = await prisma.comment.create({
      data: { text, postId },
    });
    return NextResponse.json({ success: true, comment });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
