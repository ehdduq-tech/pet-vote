"use client";

import { useState } from "react";
import { CURRENT_USER, getPostsByTab } from "@/lib/mock-data";
import PostMedia from "@/components/media/PostMedia";
import { mediaBackgroundStyle } from "@/lib/media-style";
import { useApp } from "@/context/AppContext";
import {
  RankingPostDetail,
  TrophyBadge,
} from "@/components/ranking/RankingComponents";
import {
  FamilyPetDetailModal,
  FamilyPetGrid,
  FamilyPhotoStrip,
} from "@/components/profile/ProfileFamily";
import type { FamilyPet, Post, ProfileTab } from "@/lib/types";

const TABS: { key: ProfileTab; label: string }[] = [
  { key: "uploaded", label: "업로드" },
  { key: "ranking", label: "랭킹" },
  { key: "challenged", label: "도전" },
  { key: "bookmarked", label: "북마크" },
  { key: "draft", label: "임시보관" },
  { key: "family", label: "family" },
];

export default function ProfileContent() {
  const { posts, bookmarkedPostIds } = useApp();
  const [activeTab, setActiveTab] = useState<ProfileTab>("uploaded");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedPet, setSelectedPet] = useState<FamilyPet | null>(null);

  const tabPosts = getPostsByTab(activeTab, posts, bookmarkedPostIds);
  const isFamilyTab = activeTab === "family";
  const isRankingTab = activeTab === "ranking";
  const isChallengedTab = activeTab === "challenged";

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <section className="shrink-0 border-b border-neutral-200 p-4">
        <div className="flex items-center gap-4">
          <div
            className="h-16 w-16 overflow-hidden rounded-full"
            style={mediaBackgroundStyle(CURRENT_USER.avatarUrl)}
          />
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
        <FamilyPhotoStrip onSelectPet={setSelectedPet} />
      </section>

      <div className="grid shrink-0 grid-cols-6 border-b border-neutral-200">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`py-2.5 text-center text-[10px] font-semibold leading-tight sm:text-xs ${
              activeTab === key
                ? "border-b-2 border-neutral-900 text-neutral-900"
                : "text-neutral-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {isFamilyTab ? (
          <FamilyPetGrid onSelectPet={setSelectedPet} />
        ) : tabPosts.length === 0 ? (
          <p className="py-12 text-center text-sm text-neutral-400">
            게시물이 없습니다
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {tabPosts.map((post) => (
              <button
                key={post.id}
                type="button"
                onClick={() => setSelectedPost(post)}
                className="relative aspect-square overflow-hidden bg-neutral-100"
              >
                <PostMedia
                  post={post}
                  className="absolute inset-0 h-full w-full object-cover"
                  ariaLabel={post.caption}
                />
                {isRankingTab && post.rank !== undefined && (
                  <>
                    {post.rank <= 3 ? (
                      <TrophyBadge rank={post.rank as 1 | 2 | 3} />
                    ) : (
                      <span className="absolute left-1 top-1 z-10 rounded-full bg-black/50 px-1.5 py-0.5 text-[8px] font-bold text-white">
                        {post.rank}
                      </span>
                    )}
                    <span className="absolute bottom-1 right-1 z-10 text-[8px] font-bold text-white drop-shadow-md">
                      {post.votes.toLocaleString()}표
                    </span>
                  </>
                )}
                {isChallengedTab && (
                  <span className="absolute bottom-1 right-1 z-10 text-[8px] font-bold text-white drop-shadow-md">
                    {post.votes.toLocaleString()}표
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedPost && (
        <RankingPostDetail
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}

      {selectedPet && (
        <FamilyPetDetailModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
        />
      )}
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
