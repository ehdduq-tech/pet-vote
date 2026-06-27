"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { CURRENT_USER, getPostsByTab } from "@/lib/mock-data";
import type { ProfileTab } from "@/lib/types";

const TABS: { key: ProfileTab; label: string }[] = [
  { key: "uploaded", label: "업로드" },
  { key: "challenged", label: "도전" },
  { key: "bookmarked", label: "북마크" },
  { key: "draft", label: "임시보관" },
];

export default function ProfileContent() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("uploaded");
  const tabPosts = getPostsByTab(activeTab);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* 프로필 상단 */}
      <section className="border-b border-neutral-200 p-4">
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: CURRENT_USER.avatarUrl }}
          >
            <User className="h-8 w-8 text-white/80" />
          </div>
          <div className="flex flex-1 justify-around text-center">
            <Stat label="팔로워" value={CURRENT_USER.followers} />
            <Stat label="팔로잉" value={CURRENT_USER.following} />
            <Stat label="도전" value={CURRENT_USER.challengeCount} />
          </div>
        </div>
        <p className="mt-3 text-sm font-semibold text-neutral-900">
          {CURRENT_USER.nickname}
        </p>
        <p className="mt-1 text-sm text-neutral-600">{CURRENT_USER.greeting}</p>
      </section>

      {/* 탭 + 게시물 그리드 */}
      <div className="flex border-b border-neutral-200">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-2.5 text-xs font-semibold ${
              activeTab === key
                ? "border-b-2 border-neutral-900 text-neutral-900"
                : "text-neutral-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-1 scrollbar-hide">
        {tabPosts.length === 0 ? (
          <p className="py-12 text-center text-sm text-neutral-400">
            게시물이 없습니다
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-0.5">
            {tabPosts.map((post) => (
              <div
                key={post.id}
                className="aspect-square"
                style={{ background: post.thumbnailUrl }}
                role="img"
                aria-label={post.caption}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-sm font-bold text-neutral-900">
        {value.toLocaleString()}
      </p>
      <p className="text-[10px] text-neutral-500">{label}</p>
    </div>
  );
}
