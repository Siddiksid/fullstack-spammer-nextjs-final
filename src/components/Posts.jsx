import { prisma } from "@/lib/prisma";

import React from "react";
import PostsAndComments from "./PostsAndComments";

async function Posts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      {posts.map((item) => {
        return <PostsAndComments key={item.id} post={item} />;
      })}
    </div>
  );
}

export default Posts;
