"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import FeedPost from "@/components/home/FeedPost";

export default function FeedList() {
  const { posts, focusPostId, clearFocusPost } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  useEffect(() => {
    if (!focusPostId || !containerRef.current) return;

    const target = containerRef.current.querySelector(
      `[data-post-id="${focusPostId}"]`,
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    clearFocusPost();
  }, [focusPostId, clearFocusPost, sorted.length]);

  return (
    <div
      ref={containerRef}
      className="h-full snap-y snap-mandatory overflow-y-auto scrollbar-hide"
    >
      {sorted.map((post) => (
        <div
          key={post.id}
          data-post-id={post.id}
          className="h-full min-h-0"
        >
          <FeedPost post={post} />
        </div>
      ))}
    </div>
  );
}
