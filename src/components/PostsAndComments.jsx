import React from "react";
import { prisma } from "@/lib/prisma";
import PostAndButtons from "./PostAndButtons";
async function PostsAndComments({ post }) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: post.id,
    },
  });
  return (
    <div className="ipost">
      <PostAndButtons post={post} />

      <div className="comments">
        {comments.map((item) => {
          return (
            <div>
              <p>↳</p>
              <li>{item.text}</li>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostsAndComments;
