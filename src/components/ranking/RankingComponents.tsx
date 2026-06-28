"use client";

import { Trophy, X } from "lucide-react";
import FeedPost from "@/components/home/FeedPost";
import PostMedia from "@/components/media/PostMedia";
import { useApp } from "@/context/AppContext";
import { getUserById } from "@/lib/mock-data";
import { mediaBackgroundStyle } from "@/lib/media-style";
import type { Post, RankingPeriod } from "@/lib/types";

const TROPHY_COLORS: Record<1 | 2 | 3, string> = {
  1: "text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]",
  2: "text-neutral-300 drop-shadow-[0_0_4px_rgba(212,212,212,0.8)]",
  3: "text-amber-700 drop-shadow-[0_0_4px_rgba(180,83,9,0.6)]",
};

export function TrophyBadge({ rank }: { rank: 1 | 2 | 3 }) {
  return (
    <span className="absolute left-1 top-1 z-10 rounded-full bg-black/50 p-0.5">
      <Trophy
        className={`h-3.5 w-3.5 ${TROPHY_COLORS[rank]}`}
        fill="currentColor"
      />
    </span>
  );
}

function PostTileMeta({
  post,
  size = "sm",
}: {
  post: Post;
  size?: "sm" | "md";
}) {
  const user = getUserById(post.userId);
  const avatarClass = size === "md" ? "h-5 w-5" : "h-3.5 w-3.5";
  const textClass = size === "md" ? "text-[10px]" : "text-[8px]";

  return (
    <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-1 pb-0.5">
      <div
        className={`${avatarClass} shrink-0 rounded-full border border-white/80 drop-shadow-md`}
        style={mediaBackgroundStyle(user?.avatarUrl ?? "#737373")}
        role="img"
        aria-label={post.nickname}
      />
      <span className={`${textClass} font-bold text-white drop-shadow-md`}>
        {post.votes.toLocaleString()}표
      </span>
    </div>
  );
}

type PostTileProps = {
  post: Post;
  rank?: 1 | 2 | 3;
  onClick?: () => void;
  fill?: boolean;
};

export function PostTile({ post, rank, onClick, fill = false }: PostTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full overflow-hidden bg-neutral-100 ${
        fill ? "h-full min-h-0" : "aspect-square"
      }`}
      aria-label={post.nickname}
    >
      <PostMedia
        post={post}
        className="absolute inset-0 h-full w-full object-cover"
        ariaLabel={post.nickname}
      />
      {rank !== undefined && <TrophyBadge rank={rank} />}
      <PostTileMeta post={post} />
    </button>
  );
}

type PodiumTileProps = {
  post: Post;
  rank: 1 | 2 | 3;
  onClick?: () => void;
  layout?: "page" | "modal";
};

function PodiumImage({
  post,
  rank,
  className,
  metaSize = "md",
}: {
  post: Post;
  rank: 1 | 2 | 3;
  className: string;
  metaSize?: "sm" | "md";
}) {
  return (
    <div className={className}>
      <PostMedia
        post={post}
        className="absolute inset-0 h-full w-full object-cover"
        ariaLabel={post.nickname}
      />
      <TrophyBadge rank={rank} />
      <PostTileMeta post={post} size={metaSize} />
    </div>
  );
}

export function PodiumTile({
  post,
  rank,
  onClick,
  layout = "page",
}: PodiumTileProps) {
  if (layout === "modal") {
    const heightClass = rank === 1 ? "h-28" : "h-24";

    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-full flex-col justify-end"
        aria-label={`${rank}위 ${post.nickname}`}
      >
        <PodiumImage
          post={post}
          rank={rank}
          className={`relative w-full overflow-hidden rounded-lg shadow-md ${heightClass}`}
        />
      </button>
    );
  }

  const imgClass =
    rank === 1 ? "ranking-podium-img--first" : "ranking-podium-img--side";

  return (
    <button
      type="button"
      onClick={onClick}
      className="ranking-podium-tile"
      aria-label={`${rank}위 ${post.nickname}`}
    >
      <PodiumImage
        post={post}
        rank={rank}
        className={`ranking-podium-img ${imgClass}`}
      />
    </button>
  );
}

function PhoneFrame({
  children,
  onClose,
  zClass = "z-50",
}: {
  children: React.ReactNode;
  onClose?: () => void;
  zClass?: string;
}) {
  return (
    <div
      className={`fixed inset-0 ${zClass} flex items-stretch justify-center bg-black/60`}
    >
      <div className="relative mx-auto flex h-full w-full max-w-[470px] flex-col bg-white">
        {children}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute inset-0 -z-10"
          aria-label="닫기"
        />
      )}
    </div>
  );
}

type RankingGridModalProps = {
  title: string;
  posts: Post[];
  onClose: () => void;
  onSelectPost: (post: Post) => void;
};

export function VotingGridModal({
  title,
  posts,
  onClose,
  onSelectPost,
}: RankingGridModalProps) {
  return (
    <PhoneFrame onClose={onClose}>
      <ModalHeader title={title} onClose={onClose} />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-3 gap-0">
          {posts.map((post) => (
            <PostTile key={post.id} post={post} onClick={() => onSelectPost(post)} />
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function TrendingGridModal({
  title,
  posts,
  onClose,
  onSelectPost,
}: RankingGridModalProps) {
  const topNine = posts.slice(0, 9);

  return (
    <PhoneFrame onClose={onClose}>
      <ModalHeader title={title} onClose={onClose} />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-3 gap-0">
          {topNine.map((post) => (
            <PostTile key={post.id} post={post} onClick={() => onSelectPost(post)} />
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

type PreviousRankingsModalProps = {
  periods: RankingPeriod[];
  onClose: () => void;
  onSelectPost: (post: Post) => void;
};

export function PreviousRankingsModal({
  periods,
  onClose,
  onSelectPost,
}: PreviousRankingsModalProps) {
  return (
    <PhoneFrame onClose={onClose}>
      <ModalHeader title="이전 순위" onClose={onClose} />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {periods.map((period) => {
          const top3 = period.posts.slice(0, 3);
          const podiumOrder: Array<{ post: Post; rank: 1 | 2 | 3 } | null> = [
            top3[1] ? { post: top3[1], rank: 2 } : null,
            top3[0] ? { post: top3[0], rank: 1 } : null,
            top3[2] ? { post: top3[2], rank: 3 } : null,
          ];

          return (
            <section
              key={period.id}
              className="border-b border-neutral-200 last:border-b-0"
            >
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-3 py-2 text-xs text-neutral-600">
                <span className="font-bold text-neutral-900">
                  {period.year}년 {period.round}차
                </span>
                <span className="text-neutral-500">{period.title}</span>
              </div>
              <div className="grid grid-cols-3 items-end gap-1 px-2 pb-3">
                {podiumOrder.map((item, index) =>
                  item ? (
                    <PodiumTile
                      key={item.post.id}
                      post={item.post}
                      rank={item.rank}
                      layout="modal"
                      onClick={() => onSelectPost(item.post)}
                    />
                  ) : (
                    <div key={`${period.id}-empty-${index}`} aria-hidden />
                  ),
                )}
              </div>
            </section>
          );
        })}
      </div>
    </PhoneFrame>
  );
}

function ModalHeader({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-4 py-3">
      <h2 className="text-sm font-bold text-neutral-900">{title}</h2>
      <button type="button" onClick={onClose} aria-label="닫기">
        <X className="h-5 w-5 text-neutral-600" />
      </button>
    </div>
  );
}

export function RankingPostDetail({
  post,
  onClose,
}: {
  post: Post;
  onClose: () => void;
}) {
  const { posts } = useApp();
  const livePost = posts.find((item) => item.id === post.id) ?? post;

  return (
    <div className="fixed inset-0 z-[60] flex items-stretch justify-center bg-black/60">
      <div className="relative mx-auto h-full w-full max-w-[470px] overflow-hidden bg-neutral-900">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-3 top-3 z-30 rounded-full bg-black/50 p-1.5 text-white"
          aria-label="닫기"
        >
          <X className="h-5 w-5" />
        </button>
        <FeedPost post={livePost} fullScreen />
      </div>
    </div>
  );
}
