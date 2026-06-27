import AppShell from "@/components/layout/AppShell";
import MediaCapture from "@/components/add/MediaCapture";

export default function AddPage() {
  return (
    <AppShell activePath="/add">
      <MediaCapture />
    </AppShell>
  );
}
