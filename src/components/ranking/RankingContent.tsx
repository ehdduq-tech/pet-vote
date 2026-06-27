"use client";

import { useState } from "react";
import { CURRENT_PERIOD, PREVIOUS_PERIOD } from "@/lib/mock-data";
import type { Post } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import RankingGridModal, {
  PostThumbnail,
  RankingPostDetail,
} from "@/components/ranking/RankingComponents";

function formatDeadline(deadline: string) {
  const d = new Date(deadline);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} 마감`;
}

export default function RankingContent() {
  const { posts } = useApp();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalType, setModalType] = useState<"voting" | "previous" | null>(
    null,
  );

  const ranked = [...posts].sort((a, b) => b.votes - a.votes);
  const top3 = ranked.slice(0, 3);
  const rank4to6 = ranked.slice(3, 6);
  const dailyRanked = [...posts].sort((a, b) => b.dailyVotes - a.dailyVotes);
  const dailyTop3 = dailyRanked.slice(0, 3);
  const prevTop3 = PREVIOUS_PERIOD.posts.slice(0, 3);

  const top3Display = [
    top3[1] ?? null,
    top3[0] ?? null,
    top3[2] ?? null,
  ];

  return (
    <div className="relative h-full overflow-y-auto scrollbar-hide">
      {/* 1. 순위 - 2위, 1위, 3위 */}
      <section className="border-b border-neutral-200 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-neutral-900">순위</h2>
          <span className="text-[10px] font-medium text-red-500">
            {formatDeadline(CURRENT_PERIOD.deadline)}
          </span>
        </div>
        <div className="flex items-end justify-center gap-4">
          {top3Display.map((post, i) => {
            if (!post) return null;
            const rank = i === 0 ? 2 : i === 1 ? 1 : 3;
            return (
              <PostThumbnail
                key={post.id}
                post={post}
                rank={rank}
                size={rank === 1 ? "lg" : "md"}
                onClick={() => setSelectedPost(post)}
              />
            );
          })}
        </div>
      </section>

      {/* 2. 투표중 - 4~6위 */}
      <section className="border-b border-neutral-200 p-4">
        <button
          type="button"
          className="mb-3 w-full text-left"
          onClick={() => setModalType("voting")}
        >
          <h2 className="text-sm font-bold text-neutral-900">투표중</h2>
        </button>
        <div className="flex justify-center gap-4">
          {rank4to6.map((post, i) => (
            <PostThumbnail
              key={post.id}
              post={post}
              rank={i + 4}
              size="sm"
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </div>
      </section>

      {/* 3. 인기 급상승 */}
      <section className="border-b border-neutral-200 p-4">
        <h2 className="mb-3 text-sm font-bold text-neutral-900">
          인기 급상승
        </h2>
        <div className="flex justify-center gap-4">
          {dailyTop3.map((post, i) => (
            <PostThumbnail
              key={post.id}
              post={post}
              rank={i + 1}
              size="sm"
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </div>
      </section>

      {/* 4. 이전 순위 */}
      <section className="p-4">
        <button
          type="button"
          className="mb-3 w-full text-left"
          onClick={() => setModalType("previous")}
        >
          <h2 className="text-sm font-bold text-neutral-900">이전 순위</h2>
        </button>
        <div className="flex justify-center gap-4">
          {prevTop3.map((post, i) => (
            <PostThumbnail
              key={post.id}
              post={post}
              rank={i + 1}
              size="sm"
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </div>
      </section>

      {modalType === "voting" && (
        <RankingGridModal
          title={`투표중 - ${CURRENT_PERIOD.title}`}
          posts={ranked}
          onClose={() => setModalType(null)}
          onSelectPost={(post) => {
            setModalType(null);
            setSelectedPost(post);
          }}
        />
      )}

      {modalType === "previous" && (
        <RankingGridModal
          title={`이전 순위 - ${PREVIOUS_PERIOD.title}`}
          posts={PREVIOUS_PERIOD.posts}
          topOnly={3}
          onClose={() => setModalType(null)}
          onSelectPost={(post) => {
            setModalType(null);
            setSelectedPost(post);
          }}
        />
      )}

      {selectedPost && (
        <RankingPostDetail
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}
