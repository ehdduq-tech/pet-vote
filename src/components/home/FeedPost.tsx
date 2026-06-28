"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Bookmark,
  Heart,
  MessageCircle,
  Send,
  Share2,
  Ticket,
  UserPlus,
} from "lucide-react";
import {
  CommentModal,
  MessageModal,
  ReportModal,
  ShareModal,
} from "@/components/home/PostModals";
import { useApp } from "@/context/AppContext";
import PostMedia from "@/components/media/PostMedia";
import type { Post, PostModalType } from "@/lib/types";

type FeedPostProps = {
  post: Post;
  fullScreen?: boolean;
  showVoteCount?: boolean;
};

export default function FeedPost({
  post,
  fullScreen = false,
  showVoteCount = false,
}: FeedPostProps) {
  const {
    toggleFollow,
    toggleLike,
    toggleVote,
    toggleBookmark,
    likedPostIds,
    votedPostIds,
    bookmarkedPostIds,
  } = useApp();
  const [modal, setModal] = useState<PostModalType | null>(null);

  const isLiked = likedPostIds.has(post.id);
  const isVoted = votedPostIds.has(post.id);
  const isBookmarked = bookmarkedPostIds.has(post.id);

  const handleVote = () => {
    const ok = toggleVote(post.id);
    if (!ok) {
      alert("투표권이 없습니다. 내일 다시 접속해 투표권을 받으세요!");
    }
  };

  return (
    <>
      <article
        className={`relative overflow-hidden bg-neutral-900 ${
          fullScreen ? "h-full w-full" : "h-full min-h-0 snap-start snap-always"
        }`}
      >
        <PostMedia
          post={post}
          play={post.mediaType === "video"}
          className="absolute inset-0 h-full w-full object-cover"
          ariaLabel={`${post.nickname}의 게시물`}
        />
        {post.mediaType === "video" && (
          <div className="absolute left-3 top-3 rounded bg-black/50 px-2 py-0.5 text-xs text-white">
            VIDEO
          </div>
        )}

        {showVoteCount && (
          <div className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-sm font-bold text-white">
            🗳️ {post.votes.toLocaleString()}표
          </div>
        )}

        <div className="absolute bottom-4 left-3 right-16 space-y-2">
          {post.caption && (
            <p className="text-sm text-white drop-shadow-md">{post.caption}</p>
          )}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white drop-shadow-md">
              {post.nickname}
            </span>
            <button
              type="button"
              onClick={() => toggleFollow(post.id)}
              aria-label={post.isFollowing ? "팔로잉" : "팔로우"}
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                post.isFollowing
                  ? "bg-white/20 text-white"
                  : "bg-white text-neutral-900"
              }`}
            >
              {post.isFollowing ? "팔로잉" : <UserPlus className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 right-3 flex flex-col items-center gap-4">
          <ActionButton
            icon={Heart}
            label="좋아요"
            count={post.likes}
            active={isLiked}
            activeClassName="fill-pink-500 text-pink-500"
            onClick={() => toggleLike(post.id)}
          />
          <ActionButton
            icon={Ticket}
            label="투표"
            count={post.votes}
            active={isVoted}
            activeClassName="fill-amber-400 text-amber-400"
            onClick={handleVote}
          />
          {fullScreen && (
            <ActionButton
              icon={Bookmark}
              label="북마크"
              active={isBookmarked}
              activeClassName="fill-amber-400 text-amber-400"
              onClick={() => toggleBookmark(post.id)}
            />
          )}
          <ActionButton
            icon={Send}
            label="메시지"
            onClick={() => setModal("message")}
          />
          <ActionButton
            icon={MessageCircle}
            label="댓글"
            onClick={() => setModal("comment")}
          />
          <ActionButton
            icon={Share2}
            label="공유"
            onClick={() => setModal("share")}
          />
          <ActionButton
            icon={AlertTriangle}
            label="신고"
            onClick={() => setModal("report")}
          />
        </div>
      </article>

      {modal === "message" && (
        <MessageModal post={post} onClose={() => setModal(null)} />
      )}
      {modal === "comment" && (
        <CommentModal post={post} onClose={() => setModal(null)} />
      )}
      {modal === "share" && <ShareModal onClose={() => setModal(null)} />}
      {modal === "report" && <ReportModal onClose={() => setModal(null)} />}
    </>
  );
}

function ActionButton({
  icon: Icon,
  label,
  count,
  active = false,
  activeClassName = "",
  onClick,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  count?: number;
  active?: boolean;
  activeClassName?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className="flex flex-col items-center gap-0.5 text-white"
    >
      <Icon
        className={`h-6 w-6 drop-shadow-md ${active ? activeClassName : ""}`}
        strokeWidth={1.75}
      />
      {count !== undefined && (
        <span className="text-[10px] font-semibold drop-shadow-md">
          {count > 999 ? `${(count / 1000).toFixed(1)}k` : count}
        </span>
      )}
    </button>
  );
}
