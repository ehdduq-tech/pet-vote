import { User } from "lucide-react";
import { FOLLOWING_USERS } from "@/lib/mock-data";

function StoryRing({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
      <div className="rounded-full bg-white p-[2px]">{children}</div>
    </div>
  );
}

export default function FollowingStrip() {
  return (
    <div
      className="app-following flex items-center gap-3 overflow-x-auto border-b border-neutral-200 bg-white px-4 scrollbar-hide"
    >
      {FOLLOWING_USERS.map((user) => (
        <button
          key={user.id}
          type="button"
          className="flex shrink-0 flex-col items-center gap-0.5 py-1"
        >
          <StoryRing>
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full"
              style={{ background: user.avatarUrl }}
            >
              <User className="h-5 w-5 text-white/80" strokeWidth={1.5} />
            </div>
          </StoryRing>
          <span className="w-14 truncate text-center text-[10px] text-neutral-900">
            {user.nickname}
          </span>
        </button>
      ))}
    </div>
  );
}
