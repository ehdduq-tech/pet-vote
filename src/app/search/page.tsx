import AppShell from "@/components/layout/AppShell";
import RequireAuth from "@/components/auth/RequireAuth";
import SearchContent from "@/components/search/SearchContent";

export default function SearchPage() {
  return (
    <RequireAuth>
      <AppShell activePath="/search">
        <SearchContent />
      </AppShell>
    </RequireAuth>
  );
}
