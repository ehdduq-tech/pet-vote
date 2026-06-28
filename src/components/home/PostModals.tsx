"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import type { Post } from "@/lib/types";

function formatChatTime(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function MessageModal({
  post,
  onClose,
}: {
  post: Post;
  onClose: () => void;
}) {
  const { chatsByUser, sendMessage } = useApp();
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const messages = chatsByUser[post.userId] ?? [];

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages.length]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(post.userId, text);
    setText("");
  };

  return (
    <ModalShell title={`${post.nickname}님과 대화`} onClose={onClose}>
      <div
        ref={listRef}
        className="flex-1 space-y-2 overflow-y-auto px-4 py-3 scrollbar-hide"
      >
        {messages.length === 0 ? (
          <p className="py-8 text-center text-xs text-neutral-400">
            대화를 시작해 보세요
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                  msg.isMine
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-900"
                }`}
              >
                <p>{msg.text}</p>
                <p
                  className={`mt-0.5 text-[10px] ${msg.isMine ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  {formatChatTime(msg.createdAt)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2 border-t border-neutral-200 p-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="메시지 입력"
          className="flex-1 rounded-full border border-neutral-200 px-4 py-2 text-sm outline-none focus:border-neutral-400"
        />
        <button
          type="button"
          onClick={handleSend}
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
        >
          전송
        </button>
      </div>
    </ModalShell>
  );
}

export function CommentModal({
  post,
  onClose,
}: {
  post: Post;
  onClose: () => void;
}) {
  const { commentsByPost, addComment } = useApp();
  const [text, setText] = useState("");
  const comments = commentsByPost[post.id] ?? [];

  const handleSubmit = () => {
    if (!text.trim()) return;
    addComment(post.id, text);
    setText("");
  };

  return (
    <ModalShell title="댓글" onClose={onClose}>
      <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-hide">
        {comments.length === 0 ? (
          <p className="py-8 text-center text-xs text-neutral-400">
            첫 댓글을 남겨보세요
          </p>
        ) : (
          <ul className="space-y-3">
            {comments.map((c) => (
              <li key={c.id} className="border-b border-neutral-100 pb-3">
                <p className="text-xs font-bold text-neutral-900">{c.nickname}</p>
                <p className="mt-0.5 text-sm text-neutral-700">{c.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex gap-2 border-t border-neutral-200 p-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="댓글 입력"
          className="flex-1 rounded-full border border-neutral-200 px-4 py-2 text-sm outline-none focus:border-neutral-400"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
        >
          등록
        </button>
      </div>
    </ModalShell>
  );
}

const SHARE_OPTIONS = [
  { id: "kakao", label: "카카오톡", color: "#FEE500", textColor: "#3C1E1E" },
  { id: "instagram", label: "인스타", color: "#E1306C", textColor: "#fff" },
  { id: "messenger", label: "메신저", color: "#0084FF", textColor: "#fff" },
  { id: "telegram", label: "텔레그램", color: "#26A5E4", textColor: "#fff" },
  { id: "mail", label: "메일", color: "#737373", textColor: "#fff" },
] as const;

export function ShareModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell title="공유하기" onClose={onClose}>
      <div className="grid grid-cols-3 gap-4 px-6 py-8">
        {SHARE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className="flex flex-col items-center gap-2"
            aria-label={opt.label}
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full text-xs font-bold"
              style={{ background: opt.color, color: opt.textColor }}
            >
              {opt.label.slice(0, 2)}
            </span>
            <span className="text-[11px] text-neutral-600">{opt.label}</span>
          </button>
        ))}
      </div>
      <p className="pb-4 text-center text-[10px] text-neutral-400">
        공유 연동은 준비 중입니다
      </p>
    </ModalShell>
  );
}

export function ReportModal({ onClose }: { onClose: () => void }) {
  const handleReport = () => {
    alert("신고가 접수되었습니다.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50">
      <div className="w-full max-w-[470px] overflow-hidden rounded-t-2xl bg-white">
        <button
          type="button"
          onClick={handleReport}
          className="w-full border-b border-neutral-100 py-4 text-sm font-semibold text-red-500"
        >
          신고
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-4 text-sm font-semibold text-neutral-700"
        >
          취소
        </button>
      </div>
    </div>
  );
}

function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50">
      <div className="flex h-[70dvh] w-full max-w-[470px] flex-col rounded-t-2xl bg-white">
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <h2 className="text-sm font-bold text-neutral-900">{title}</h2>
          <button type="button" onClick={onClose} aria-label="닫기">
            <X className="h-5 w-5 text-neutral-600" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
