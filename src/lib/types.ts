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

export type Comment = {
  id: string;
  postId: string;
  nickname: string;
  text: string;
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  userId: string;
  text: string;
  isMine: boolean;
  createdAt: string;
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
  year: number;
  round: number;
  deadline: string;
  posts: Post[];
};

export type NavItem = {
  href: string;
  label: string;
  iconName: "home" | "ranking" | "add" | "search" | "profile";
};

export type ProfileTab =
  | "uploaded"
  | "ranking"
  | "challenged"
  | "bookmarked"
  | "draft"
  | "family";

export type FamilyPet = {
  id: string;
  name: string;
  breed: string;
  gender: string;
  age: string;
  notes: string;
  photoUrl: string;
};

export type ProfilePost = Post & {
  rank?: number;
};

export type PostModalType = "message" | "comment" | "share" | "report";
