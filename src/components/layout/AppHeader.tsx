"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, Ticket } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { useApp } from "@/context/AppContext";
import NotificationPanel from "@/components/layout/NotificationPanel";

export default function AppHeader() {
  const { voteTickets, notifications, markNotificationRead, navigateToPost, logout } =
    useApp();
  const [showPanel, setShowPanel] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isProfile = pathname === "/profile";
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!showMenu) return;
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showMenu]);

  const handleNotificationSelect = (
    notification: (typeof notifications)[0],
  ) => {
    markNotificationRead(notification.id);
    navigateToPost(notification.postId);
    setShowPanel(false);
    if (pathname !== "/") {
      router.push("/");
    }
  };

  const handleLogout = () => {
    setShowMenu(false);
    logout();
    router.push("/open");
  };

  return (
    <header className="app-header relative shrink-0 border-b border-neutral-200 bg-white px-4">
      <div className="flex h-full items-center justify-between">
        <div className="relative w-10">
          <button
            type="button"
            onClick={() => setShowPanel((v) => !v)}
            className="relative rounded-full p-1.5 text-neutral-700 hover:bg-neutral-100"
            aria-label="알림"
          >
            <Bell className="h-5 w-5" strokeWidth={1.75} />
            {unreadCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          {showPanel && (
            <NotificationPanel
              notifications={notifications}
              onClose={() => setShowPanel(false)}
              onSelect={handleNotificationSelect}
            />
          )}
        </div>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-black tracking-wide text-neutral-900">
          {APP_NAME}
        </h1>

        <div
          className={`relative flex items-center justify-end gap-0.5 text-sm font-semibold text-neutral-900 ${
            isProfile ? "w-[4.5rem]" : "w-10"
          }`}
        >
          <Ticket className="h-4 w-4 text-amber-500" strokeWidth={2} />
          <span>{voteTickets}</span>
          {isProfile && (
            <div ref={menuRef} className="relative ml-0.5">
              <button
                type="button"
                onClick={() => setShowMenu((v) => !v)}
                className="rounded-full p-1 text-neutral-700 hover:bg-neutral-100"
                aria-label="메뉴"
              >
                <Menu className="h-5 w-5" strokeWidth={1.75} />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full z-50 mt-1 min-w-[7rem] overflow-hidden rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-xs font-semibold text-red-500 hover:bg-neutral-50"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
