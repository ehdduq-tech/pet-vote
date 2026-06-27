import AppShell from "@/components/layout/AppShell";
import ProfileContent from "@/components/profile/ProfileContent";

export default function ProfilePage() {
  return (
    <AppShell activePath="/profile">
      <ProfileContent />
    </AppShell>
  );
}
