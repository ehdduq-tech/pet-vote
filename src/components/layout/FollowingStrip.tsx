"use client";

import { FOLLOWING_USERS } from "@/lib/mock-data";
import { mediaBackgroundStyle } from "@/lib/media-style";
import { useApp } from "@/context/AppContext";

function StoryRing({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
      <div className="rounded-full bg-white p-[2px]">{children}</div>
    </div>
  );
}

export default function FollowingStrip() {
  const { posts, navigateToPost } = useApp();

  const handleUserClick = (userId: string) => {
    const userPosts = posts.filter((p) => p.userId === userId);
    if (userPosts.length === 0) return;

    const latest = [...userPosts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];
    navigateToPost(latest.id);
  };

  return (
    <div className="app-following mt-1 flex items-center gap-3 overflow-x-auto border-b border-neutral-200 bg-white px-4 pb-2 pt-1 scrollbar-hide">
      {FOLLOWING_USERS.map((user) => (
        <button
          key={user.id}
          type="button"
          onClick={() => handleUserClick(user.id)}
          className="flex shrink-0 flex-col items-center gap-0.5"
        >
          <StoryRing>
            <div
              className="h-11 w-11 rounded-full"
              style={mediaBackgroundStyle(user.avatarUrl)}
              role="img"
              aria-label={user.nickname}
            />
          </StoryRing>
          <span className="w-14 truncate text-center text-[10px] text-neutral-900">
            {user.nickname}
          </span>
        </button>
      ))}
    </div>
  );
}
