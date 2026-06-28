import AppShell from "@/components/layout/AppShell";
import RequireAuth from "@/components/auth/RequireAuth";
import ProfileContent from "@/components/profile/ProfileContent";

export default function ProfilePage() {
  return (
    <RequireAuth>
      <AppShell activePath="/profile">
        <ProfileContent />
      </AppShell>
    </RequireAuth>
  );
}
