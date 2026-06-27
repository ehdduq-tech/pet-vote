"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MOCK_POSTS } from "@/lib/mock-data";
import type { Post } from "@/lib/types";
import {
  getVoteTickets,
  grantDailyTickets,
  useVoteTicket,
} from "@/lib/vote-tickets";

type AppContextValue = {
  posts: Post[];
  voteTickets: number;
  voteForPost: (postId: string) => boolean;
  toggleFollow: (postId: string) => void;
  toggleLike: (postId: string) => void;
  addPost: (post: Post) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRankingPost: Post | null;
  setSelectedRankingPost: (post: Post | null) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [voteTickets, setVoteTickets] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRankingPost, setSelectedRankingPost] = useState<Post | null>(
    null,
  );

  useEffect(() => {
    setVoteTickets(grantDailyTickets());
  }, []);

  const voteForPost = useCallback((postId: string) => {
    const success = useVoteTicket();
    if (!success) return false;

    setVoteTickets(getVoteTickets());
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, votes: p.votes + 1, dailyVotes: p.dailyVotes + 1 }
          : p,
      ),
    );
    return true;
  }, []);

  const toggleFollow = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, isFollowing: !p.isFollowing } : p,
      ),
    );
  }, []);

  const toggleLike = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p,
      ),
    );
  }, []);

  const addPost = useCallback((post: Post) => {
    setPosts((prev) => [post, ...prev]);
  }, []);

  const value = useMemo(
    () => ({
      posts,
      voteTickets,
      voteForPost,
      toggleFollow,
      toggleLike,
      addPost,
      searchQuery,
      setSearchQuery,
      selectedRankingPost,
      setSelectedRankingPost,
    }),
    [
      posts,
      voteTickets,
      voteForPost,
      toggleFollow,
      toggleLike,
      addPost,
      searchQuery,
      selectedRankingPost,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
