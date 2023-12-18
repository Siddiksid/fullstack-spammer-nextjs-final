import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, response) {
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
    const likes = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: { increment: 1 },
      },
    });
    return NextResponse.json({ success: true, likes });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
