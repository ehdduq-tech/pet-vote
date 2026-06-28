"use client";

import { useEffect, useRef } from "react";
import type { Notification } from "@/lib/notifications";

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "방금";
  if (diffHours < 24) return `${diffHours}시간 전`;
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default function NotificationPanel({
  notifications,
  onClose,
  onSelect,
}: {
  notifications: Notification[];
  onClose: () => void;
  onSelect: (notification: Notification) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="absolute left-0 top-full z-50 mt-1 w-72 rounded-xl border border-neutral-200 bg-white shadow-lg"
    >
      <div className="border-b border-neutral-100 px-3 py-2">
        <p className="text-xs font-bold text-neutral-900">알림</p>
        <p className="text-[10px] text-neutral-500">
          팔로워·팔로잉 게시물 업로드
        </p>
      </div>
      <ul className="max-h-64 overflow-y-auto scrollbar-hide">
        {notifications.length === 0 ? (
          <li className="px-3 py-4 text-center text-xs text-neutral-400">
            새 알림이 없습니다
          </li>
        ) : (
          notifications.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => onSelect(n)}
                className={`w-full border-b border-neutral-50 px-3 py-2.5 text-left last:border-b-0 hover:bg-neutral-50 ${
                  !n.read ? "bg-amber-50/50" : ""
                }`}
              >
                <p className="text-xs font-medium text-neutral-900">
                  {n.message}
                </p>
                <p className="mt-0.5 text-[10px] text-neutral-400">
                  {formatTime(n.createdAt)}
                </p>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
