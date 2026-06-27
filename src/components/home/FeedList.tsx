"use client";

import { useApp } from "@/context/AppContext";
import FeedPost from "@/components/home/FeedPost";

export default function FeedList() {
  const { posts } = useApp();

  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="h-full snap-y snap-mandatory overflow-y-auto scrollbar-hide">
      {sorted.map((post) => (
        <div key={post.id} className="h-full min-h-0">
          <FeedPost post={post} />
        </div>
      ))}
    </div>
  );
}
