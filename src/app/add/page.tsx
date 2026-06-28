import AppShell from "@/components/layout/AppShell";
import RequireAuth from "@/components/auth/RequireAuth";
import MediaCapture from "@/components/add/MediaCapture";

export default function AddPage() {
  return (
    <RequireAuth>
      <AppShell activePath="/add">
        <MediaCapture />
      </AppShell>
    </RequireAuth>
  );
}
