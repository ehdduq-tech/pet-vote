import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";
import FollowingStrip from "@/components/layout/FollowingStrip";

type AppShellProps = {
  children: React.ReactNode;
  activePath: string;
  showFollowing?: boolean;
  mainClassName?: string;
};

export default function AppShell({
  children,
  activePath,
  showFollowing = false,
  mainClassName = "",
}: AppShellProps) {
  if (showFollowing) {
    return (
      <div className="app-shell--home mx-auto h-full min-h-dvh w-full max-w-[470px] bg-white">
        <AppHeader />
        <FollowingStrip />
        <main className={`app-main overflow-hidden ${mainClassName}`}>
          {children}
        </main>
        <BottomNav activePath={activePath} />
      </div>
    );
  }

  return (
    <div className="app-shell--compact mx-auto h-full min-h-dvh w-full max-w-[470px] bg-white">
      <AppHeader />
      <main className={`app-main overflow-hidden ${mainClassName}`}>
        {children}
      </main>
      <BottomNav activePath={activePath} />
    </div>
  );
}
