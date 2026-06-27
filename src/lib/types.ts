export type MediaType = "image" | "video";

export type Post = {
  id: string;
  userId: string;
  nickname: string;
  caption: string;
  mediaType: MediaType;
  mediaUrl: string;
  thumbnailUrl: string;
  likes: number;
  votes: number;
  dailyVotes: number;
  createdAt: string;
  isFollowing?: boolean;
};

export type User = {
  id: string;
  nickname: string;
  avatarUrl: string;
  followers: number;
  following: number;
  challengeCount: number;
  greeting: string;
};

export type RankingPeriod = {
  id: string;
  title: string;
  deadline: string;
  posts: Post[];
};

export type NavItem = {
  href: string;
  label: string;
  iconName: "home" | "ranking" | "add" | "search" | "profile";
};

export type ProfileTab = "uploaded" | "challenged" | "bookmarked" | "draft";
