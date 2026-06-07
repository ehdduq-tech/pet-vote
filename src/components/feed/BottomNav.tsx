import { Home, PlusSquare, Search, Heart, User } from "lucide-react";

const NAV_ITEMS = [
  { icon: Home, label: "홈", active: true },
  { icon: Search, label: "검색", active: false },
  { icon: PlusSquare, label: "추가", active: false },
  { icon: Heart, label: "알림", active: false },
  { icon: User, label: "프로필", active: false },
] as const;

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-10 flex w-full max-w-[470px] -translate-x-1/2 items-center justify-around border-t border-neutral-200 bg-white px-2 py-2">
      {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          aria-current={active ? "page" : undefined}
          className={`p-2 ${active ? "text-neutral-900" : "text-neutral-500"}`}
        >
          <Icon
            className="h-6 w-6"
            strokeWidth={active ? 2.25 : 1.75}
            fill={active && label === "홈" ? "currentColor" : "none"}
          />
        </button>
      ))}
    </nav>
  );
}
