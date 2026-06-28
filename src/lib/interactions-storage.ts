import type { ChatMessage, Comment } from "./types";

const LIKED_KEY = "pet-app-liked-posts";
const VOTED_KEY = "pet-app-voted-posts";
const BOOKMARKED_KEY = "pet-app-bookmarked-posts";
const COMMENTS_KEY = "pet-app-comments";
const CHATS_KEY = "pet-app-chats";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function loadLikedPostIds(): string[] {
  return readJson<string[]>(LIKED_KEY, []);
}

export function saveLikedPostIds(ids: string[]) {
  writeJson(LIKED_KEY, ids);
}

export function loadVotedPostIds(): string[] {
  return readJson<string[]>(VOTED_KEY, []);
}

export function saveVotedPostIds(ids: string[]) {
  writeJson(VOTED_KEY, ids);
}

export function loadBookmarkedPostIds(): string[] {
  return readJson<string[]>(BOOKMARKED_KEY, []);
}

export function saveBookmarkedPostIds(ids: string[]) {
  writeJson(BOOKMARKED_KEY, ids);
}

export function loadComments(): Record<string, Comment[]> {
  return readJson<Record<string, Comment[]>>(COMMENTS_KEY, {});
}

export function saveComments(comments: Record<string, Comment[]>) {
  writeJson(COMMENTS_KEY, comments);
}

export function loadChats(): Record<string, ChatMessage[]> {
  return readJson<Record<string, ChatMessage[]>>(CHATS_KEY, {});
}

export function saveChats(chats: Record<string, ChatMessage[]>) {
  writeJson(CHATS_KEY, chats);
}
