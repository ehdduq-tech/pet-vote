"use client";

import { X } from "lucide-react";
import FeedPost from "@/components/home/FeedPost";
import type { Post } from "@/lib/types";

type PostThumbnailProps = {
  post: Post;
  rank?: number;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
};

export function PostThumbnail({
  post,
  rank,
  size = "md",
  onClick,
}: PostThumbnailProps) {
  const sizeClass =
    size === "sm"
      ? "h-16 w-16"
      : size === "lg"
        ? "h-24 w-24"
        : "h-20 w-20";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1"
    >
      {rank !== undefined && (
        <span className="text-xs font-bold text-neutral-700">{rank}위</span>
      )}
      <div
        className={`${sizeClass} rounded-lg shadow-md`}
        style={{ background: post.thumbnailUrl }}
        role="img"
        aria-label={`${post.nickname} 게시물`}
      />
      <span className="w-20 truncate text-center text-[10px] text-neutral-600">
        {post.nickname}
      </span>
    </button>
  );
}

type RankingGridModalProps = {
  title: string;
  posts: Post[];
  onClose: () => void;
  onSelectPost: (post: Post) => void;
  topOnly?: number;
};

export default function RankingGridModal({
  title,
  posts,
  onClose,
  onSelectPost,
  topOnly,
}: RankingGridModalProps) {
  const displayPosts = topOnly ? posts.slice(0, topOnly) : posts;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="flex h-[85dvh] w-full max-w-[470px] flex-col rounded-t-2xl bg-white">
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <h2 className="text-sm font-bold text-neutral-900">{title}</h2>
          <button type="button" onClick={onClose} aria-label="닫기">
            <X className="h-5 w-5 text-neutral-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          <div className="grid grid-cols-3 gap-3">
            {displayPosts.map((post, index) => (
              <button
                key={post.id}
                type="button"
                onClick={() => onSelectPost(post)}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-xs font-bold text-neutral-500">
                  {index + 1}위
                </span>
                <div
                  className="aspect-square w-full rounded-lg"
                  style={{ background: post.thumbnailUrl }}
                />
                <span className="truncate text-[10px] text-neutral-600">
                  {post.nickname}
                </span>
                <span className="text-[10px] font-semibold text-amber-600">
                  {post.votes}표
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
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
  return (
    <div className="absolute inset-0 z-10 bg-neutral-900">
      <button
        type="button"
        onClick={onClose}
        className="absolute left-3 top-3 z-20 rounded-full bg-black/50 p-1.5 text-white"
        aria-label="닫기"
      >
        <X className="h-5 w-5" />
      </button>
      <FeedPost post={post} fullScreen showVoteCount />
    </div>
  );
}
