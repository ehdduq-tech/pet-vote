import {
  Home,
  PlusSquare,
  Search,
  Trophy,
  User,
} from "lucide-react";
import Link from "next/link";
import type { NavItem } from "@/lib/types";

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "홈", iconName: "home" },
  { href: "/ranking", label: "랭킹", iconName: "ranking" },
  { href: "/add", label: "추가", iconName: "add" },
  { href: "/search", label: "검색", iconName: "search" },
  { href: "/profile", label: "프로필", iconName: "profile" },
];

const ICONS = {
  home: Home,
  ranking: Trophy,
  add: PlusSquare,
  search: Search,
  profile: User,
} as const;

type BottomNavProps = {
  activePath: string;
};

export default function BottomNav({ activePath }: BottomNavProps) {
  return (
    <nav
      className="flex h-14 shrink-0 items-center justify-around border-t border-neutral-200 bg-white px-2"
      aria-label="메인 네비게이션"
    >
      {NAV_ITEMS.map(({ href, label, iconName }) => {
        const Icon = ICONS[iconName];
        const active =
          href === "/" ? activePath === "/" : activePath.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={`p-2 ${active ? "text-neutral-900" : "text-neutral-500"}`}
          >
            <Icon
              className="h-6 w-6"
              strokeWidth={active ? 2.25 : 1.75}
              fill={active && iconName === "home" ? "currentColor" : "none"}
            />
          </Link>
        );
      })}
    </nav>
  );
}
