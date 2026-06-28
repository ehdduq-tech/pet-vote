"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import OpenPage from "@/components/open/OpenPage";
import { useApp } from "@/context/AppContext";

export default function OpenPageRoute() {
  const { isAuthenticated, authReady } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (authReady && isAuthenticated) {
      router.replace("/");
    }
  }, [authReady, isAuthenticated, router]);

  if (!authReady) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-[470px] items-center justify-center bg-white">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <OpenPage />;
}
