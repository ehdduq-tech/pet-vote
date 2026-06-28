"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { login as persistLogin, logout as persistLogout, isAuthenticated } from "@/lib/auth";
import {
  loadFamilyPets,
  saveFamilyPets,
} from "@/lib/family-storage";
import {
  loadBookmarkedPostIds,
  loadChats,
  loadComments,
  loadLikedPostIds,
  loadVotedPostIds,
  saveBookmarkedPostIds,
  saveChats,
  saveComments,
  saveLikedPostIds,
  saveVotedPostIds,
} from "@/lib/interactions-storage";
import { MOCK_POSTS, CURRENT_USER } from "@/lib/mock-data";
import { MOCK_NOTIFICATIONS } from "@/lib/notifications";
import type { Notification } from "@/lib/notifications";
import type { ChatMessage, Comment, FamilyPet, Post } from "@/lib/types";
import {
  getVoteTickets,
  grantDailyTickets,
  returnVoteTicket,
  useVoteTicket,
} from "@/lib/vote-tickets";

type AppContextValue = {
  isAuthenticated: boolean;
  authReady: boolean;
  login: () => void;
  logout: () => void;
  posts: Post[];
  voteTickets: number;
  likedPostIds: Set<string>;
  votedPostIds: Set<string>;
  bookmarkedPostIds: Set<string>;
  notifications: Notification[];
  commentsByPost: Record<string, Comment[]>;
  chatsByUser: Record<string, ChatMessage[]>;
  focusPostId: string | null;
  voteForPost: (postId: string) => boolean;
  toggleFollow: (postId: string) => void;
  toggleLike: (postId: string) => void;
  toggleVote: (postId: string) => boolean;
  toggleBookmark: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  sendMessage: (userId: string, text: string) => void;
  markNotificationRead: (notificationId: string) => void;
  navigateToPost: (postId: string) => void;
  clearFocusPost: () => void;
  addPost: (post: Post) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRankingPost: Post | null;
  setSelectedRankingPost: (post: Post | null) => void;
  familyPets: FamilyPet[];
  addFamilyPet: (pet: Omit<FamilyPet, "id">) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [authReady, setAuthReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [voteTickets, setVoteTickets] = useState(0);
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
  const [votedPostIds, setVotedPostIds] = useState<Set<string>>(new Set());
  const [bookmarkedPostIds, setBookmarkedPostIds] = useState<Set<string>>(
    new Set(),
  );
  const [commentsByPost, setCommentsByPost] = useState<
    Record<string, Comment[]>
  >({});
  const [chatsByUser, setChatsByUser] = useState<
    Record<string, ChatMessage[]>
  >({});
  const [notifications, setNotifications] = useState<Notification[]>(
    MOCK_NOTIFICATIONS,
  );
  const [focusPostId, setFocusPostId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRankingPost, setSelectedRankingPost] = useState<Post | null>(
    null,
  );
  const [familyPets, setFamilyPets] = useState<FamilyPet[]>([]);

  useEffect(() => {
    try {
      const authed = isAuthenticated();
      setIsAuth(authed);
      if (authed) {
        setVoteTickets(grantDailyTickets());
      }
      setLikedPostIds(new Set(loadLikedPostIds()));
      setVotedPostIds(new Set(loadVotedPostIds()));
      setBookmarkedPostIds(new Set(loadBookmarkedPostIds()));
      setCommentsByPost(loadComments());
      setChatsByUser(loadChats());
      const pets = loadFamilyPets();
      setFamilyPets(pets);
      saveFamilyPets(pets);
    } catch {
      setIsAuth(false);
    } finally {
      setAuthReady(true);
    }
  }, []);

  const login = useCallback(() => {
    persistLogin();
    setIsAuth(true);
    setAuthReady(true);
    try {
      setVoteTickets(grantDailyTickets());
    } catch {
      setVoteTickets(3);
    }
  }, []);

  const logout = useCallback(() => {
    persistLogout();
    setIsAuth(false);
  }, []);

  const addFamilyPet = useCallback((pet: Omit<FamilyPet, "id">) => {
    const next: FamilyPet = { ...pet, id: `pet-${Date.now()}` };
    setFamilyPets((prev) => {
      const updated = [...prev, next];
      saveFamilyPets(updated);
      return updated;
    });
  }, []);

  const toggleLike = useCallback((postId: string) => {
    setLikedPostIds((prev) => {
      const liked = prev.has(postId);
      const next = new Set(prev);
      if (liked) next.delete(postId);
      else next.add(postId);
      saveLikedPostIds([...next]);

      setPosts((posts) =>
        posts.map((p) =>
          p.id === postId
            ? { ...p, likes: liked ? p.likes - 1 : p.likes + 1 }
            : p,
        ),
      );
      return next;
    });
  }, []);

  const toggleVote = useCallback((postId: string): boolean => {
    const currentlyVoted = votedPostIds.has(postId);

    if (currentlyVoted) {
      returnVoteTicket();
      setVoteTickets(getVoteTickets());
      const next = new Set(votedPostIds);
      next.delete(postId);
      setVotedPostIds(next);
      saveVotedPostIds([...next]);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                votes: p.votes - 1,
                dailyVotes: Math.max(0, p.dailyVotes - 1),
              }
            : p,
        ),
      );
      return true;
    }

    if (getVoteTickets() <= 0) return false;
    if (!useVoteTicket()) return false;

    setVoteTickets(getVoteTickets());
    const next = new Set(votedPostIds);
    next.add(postId);
    setVotedPostIds(next);
    saveVotedPostIds([...next]);
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, votes: p.votes + 1, dailyVotes: p.dailyVotes + 1 }
          : p,
      ),
    );
    return true;
  }, [votedPostIds]);

  const toggleBookmark = useCallback((postId: string) => {
    setBookmarkedPostIds((prev) => {
      const saved = prev.has(postId);
      const next = new Set(prev);
      if (saved) next.delete(postId);
      else next.add(postId);
      saveBookmarkedPostIds([...next]);
      return next;
    });
  }, []);

  const voteForPost = useCallback(
    (postId: string) => toggleVote(postId),
    [toggleVote],
  );

  const toggleFollow = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, isFollowing: !p.isFollowing } : p,
      ),
    );
  }, []);

  const addComment = useCallback((postId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const comment: Comment = {
      id: `c-${Date.now()}`,
      postId,
      nickname: CURRENT_USER.nickname,
      text: trimmed,
      createdAt: new Date().toISOString(),
    };

    setCommentsByPost((prev) => {
      const next = {
        ...prev,
        [postId]: [...(prev[postId] ?? []), comment],
      };
      saveComments(next);
      return next;
    });
  }, []);

  const sendMessage = useCallback((userId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const message: ChatMessage = {
      id: `m-${Date.now()}`,
      userId,
      text: trimmed,
      isMine: true,
      createdAt: new Date().toISOString(),
    };

    setChatsByUser((prev) => {
      const next = {
        ...prev,
        [userId]: [...(prev[userId] ?? []), message],
      };
      saveChats(next);
      return next;
    });
  }, []);

  const markNotificationRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n,
      ),
    );
  }, []);

  const navigateToPost = useCallback((postId: string) => {
    setFocusPostId(postId);
  }, []);

  const clearFocusPost = useCallback(() => {
    setFocusPostId(null);
  }, []);

  const addPost = useCallback((post: Post) => {
    setPosts((prev) => [post, ...prev]);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: isAuth,
      authReady,
      login,
      logout,
      posts,
      voteTickets,
      likedPostIds,
      votedPostIds,
      bookmarkedPostIds,
      notifications,
      commentsByPost,
      chatsByUser,
      focusPostId,
      voteForPost,
      toggleFollow,
      toggleLike,
      toggleVote,
      toggleBookmark,
      addComment,
      sendMessage,
      markNotificationRead,
      navigateToPost,
      clearFocusPost,
      addPost,
      searchQuery,
      setSearchQuery,
      selectedRankingPost,
      setSelectedRankingPost,
      familyPets,
      addFamilyPet,
    }),
    [
      isAuth,
      authReady,
      login,
      logout,
      posts,
      voteTickets,
      likedPostIds,
      votedPostIds,
      bookmarkedPostIds,
      notifications,
      commentsByPost,
      chatsByUser,
      focusPostId,
      voteForPost,
      toggleFollow,
      toggleLike,
      toggleVote,
      toggleBookmark,
      addComment,
      sendMessage,
      markNotificationRead,
      navigateToPost,
      clearFocusPost,
      addPost,
      searchQuery,
      selectedRankingPost,
      familyPets,
      addFamilyPet,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
