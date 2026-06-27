import AppShell from "@/components/layout/AppShell";
import RankingContent from "@/components/ranking/RankingContent";

export default function RankingPage() {
  return (
    <AppShell activePath="/ranking">
      <RankingContent />
    </AppShell>
  );
}
