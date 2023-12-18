import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, response) {
  try {
    const { postId } = response.params;
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({
        success: false,
        error: "You must provide a text to edit a post.",
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
        error: "No post with that ID found.",
      });
    }
    const updatedText = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        text: text,
      },
    });
    return NextResponse.json({
      success: true,
      posts: updatedText,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(request, response) {
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
        error: "No post with that ID found.",
      });
    }
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return NextResponse.json({ success: true, deletedPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
