import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  User,
} from "lucide-react";

type PostCardProps = {
  nickname: string;
  likes: number;
  caption: string;
};

export default function PostCard({ nickname, likes, caption }: PostCardProps) {
  return (
    <article className="border-b border-neutral-200 bg-white">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200">
            <User className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-semibold text-neutral-900">
            {nickname}
          </span>
        </div>
        <button type="button" aria-label="더보기" className="text-neutral-900">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div
        className="aspect-square w-full bg-gradient-to-br from-yellow-300 via-orange-400 via-pink-500 to-blue-500"
        role="img"
        aria-label="게시물 이미지"
      />

      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-4">
          <button type="button" aria-label="좋아요" className="text-neutral-900">
            <Heart className="h-6 w-6" strokeWidth={1.75} />
          </button>
          <button type="button" aria-label="댓글" className="text-neutral-900">
            <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
          </button>
          <button type="button" aria-label="공유" className="text-neutral-900">
            <Send className="h-6 w-6" strokeWidth={1.75} />
          </button>
        </div>
        <button type="button" aria-label="저장" className="text-neutral-900">
          <Bookmark className="h-6 w-6" strokeWidth={1.75} />
        </button>
      </div>

      <div className="space-y-1 px-3 pb-4">
        <p className="text-sm font-semibold text-neutral-900">
          좋아요 {likes.toLocaleString()}개
        </p>
        <p className="text-sm text-neutral-900">
          <span className="font-semibold">{nickname}</span> {caption}
        </p>
      </div>
    </article>
  );
}
