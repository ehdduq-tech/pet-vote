import AppShell from "@/components/layout/AppShell";
import SearchContent from "@/components/search/SearchContent";

export default function SearchPage() {
  return (
    <AppShell activePath="/search">
      <SearchContent />
    </AppShell>
  );
}
