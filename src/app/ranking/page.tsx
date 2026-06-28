import AppShell from "@/components/layout/AppShell";
import RequireAuth from "@/components/auth/RequireAuth";
import RankingContent from "@/components/ranking/RankingContent";

export default function RankingPage() {
  return (
    <RequireAuth>
      <AppShell activePath="/ranking">
        <RankingContent />
      </AppShell>
    </RequireAuth>
  );
}
