"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import FeedList from "@/components/home/FeedList";
import { useApp } from "@/context/AppContext";

export default function HomePage() {
  const { isAuthenticated, authReady } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (authReady && !isAuthenticated) {
      router.replace("/open");
    }
  }, [authReady, isAuthenticated, router]);

  if (!authReady || !isAuthenticated) {
    return null;
  }

  return (
    <AppShell activePath="/" showFollowing>
      <FeedList />
    </AppShell>
  );
}
