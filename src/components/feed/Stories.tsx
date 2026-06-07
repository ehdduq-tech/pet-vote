import { Plus, User } from "lucide-react";

const STORIES = [
  { id: "1", name: "story1" },
  { id: "2", name: "story2" },
  { id: "3", name: "story3" },
  { id: "4", name: "story4" },
  { id: "5", name: "story5" },
];

function StoryRing({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
      <div className="rounded-full bg-white p-[2px]">{children}</div>
    </div>
  );
}

export default function Stories() {
  return (
    <div className="flex gap-4 overflow-x-auto border-b border-neutral-200 bg-white px-4 py-3 scrollbar-hide">
      <button type="button" className="flex shrink-0 flex-col items-center gap-1">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-300 bg-neutral-100">
            <User className="h-8 w-8 text-neutral-400" strokeWidth={1.5} />
          </div>
          <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white">
            <Plus className="h-3 w-3" strokeWidth={3} />
          </span>
        </div>
        <span className="w-16 truncate text-center text-xs text-neutral-900">
          내 스토리
        </span>
      </button>

      {STORIES.map((story) => (
        <button
          key={story.id}
          type="button"
          className="flex shrink-0 flex-col items-center gap-1"
        >
          <StoryRing>
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-neutral-200">
              <User className="h-7 w-7 text-neutral-400" strokeWidth={1.5} />
            </div>
          </StoryRing>
          <span className="w-16 truncate text-center text-xs text-neutral-900">
            {story.name}
          </span>
        </button>
      ))}
    </div>
  );
}
