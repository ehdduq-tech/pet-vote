import AppShell from "@/components/layout/AppShell";
import FeedList from "@/components/home/FeedList";

export default function HomePage() {
  return (
    <AppShell activePath="/">
      <FeedList />
    </AppShell>
  );
}
