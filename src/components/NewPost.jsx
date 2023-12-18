"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function NewPost() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.error);
    } else {
      setText("");
      setError("");
      router.refresh();
    }
  }

  return (
    <div id="addPost">
      <form onSubmit={handleSubmit} id="formPost">
        <input
          id="newPost"
          type="text"
          placeholder="Add a Post..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button id="btnAddPost">Add A Post</button>
        {error ? <p id="errorNewPost">⛔{error}⛔</p> : null}
      </form>
    </div>
  );
}
