"use client";

import {
  AlertTriangle,
  Heart,
  MessageCircle,
  Send,
  Share2,
  Ticket,
  UserPlus,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import type { Post } from "@/lib/types";

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
  const { voteForPost, toggleFollow, toggleLike, voteTickets } = useApp();

  const handleVote = () => {
    if (voteTickets <= 0) {
      alert("투표권이 없습니다. 내일 다시 접속해 투표권을 받으세요!");
      return;
    }
    const ok = voteForPost(post.id);
    if (ok) alert("투표가 완료되었습니다!");
  };

  return (
    <article
      className={`relative overflow-hidden bg-neutral-900 ${
        fullScreen ? "h-full w-full" : "h-full min-h-0 snap-start snap-always"
      }`}
    >
      <div
        className="absolute inset-0"
        style={{ background: post.mediaUrl }}
        role="img"
        aria-label={`${post.nickname}의 게시물`}
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

      {/* 좌측 하단: 닉네임 + 팔로우, 위에 내용 */}
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
            {post.isFollowing ? "팔로잉" : (
              <UserPlus className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* 우측 하단: 세로 액션 버튼 */}
      <div className="absolute bottom-4 right-3 flex flex-col items-center gap-4">
        <ActionButton
          icon={Heart}
          label="좋아요"
          count={post.likes}
          onClick={() => toggleLike(post.id)}
        />
        <ActionButton
          icon={Ticket}
          label="투표"
          count={post.votes}
          onClick={handleVote}
        />
        <ActionButton icon={Send} label="메시지" />
        <ActionButton icon={MessageCircle} label="댓글" />
        <ActionButton icon={Share2} label="공유" />
        <ActionButton icon={AlertTriangle} label="신고" />
      </div>
    </article>
  );
}

function ActionButton({
  icon: Icon,
  label,
  count,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  count?: number;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex flex-col items-center gap-0.5 text-white"
    >
      <Icon className="h-6 w-6 drop-shadow-md" strokeWidth={1.75} />
      {count !== undefined && (
        <span className="text-[10px] font-semibold drop-shadow-md">
          {count > 999 ? `${(count / 1000).toFixed(1)}k` : count}
        </span>
      )}
    </button>
  );
}
