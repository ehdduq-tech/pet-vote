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
  showFollowing = true,
  mainClassName = "",
}: AppShellProps) {
  return (
    <div className="app-shell mx-auto w-full max-w-[470px] bg-white">
      <AppHeader />
      {showFollowing && <FollowingStrip />}
      <main className={`app-main overflow-hidden ${mainClassName}`}>
        {children}
      </main>
      <BottomNav activePath={activePath} />
    </div>
  );
}
