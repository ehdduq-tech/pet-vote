import type { Post, RankingPeriod, User } from "./types";

const gradient = (from: string, to: string) =>
  `linear-gradient(135deg, ${from}, ${to})`;

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    nickname: "백쌤고양이",
    avatarUrl: gradient("#fbbf24", "#f97316"),
    followers: 1280,
    following: 342,
    challengeCount: 12,
    greeting: "우리 막내 자랑하는 공간 🐾",
  },
  {
    id: "u2",
    nickname: "동엽강아지",
    avatarUrl: gradient("#60a5fa", "#3b82f6"),
    followers: 890,
    following: 210,
    challengeCount: 8,
    greeting: "산책 좋아하는 댕댕이",
  },
  {
    id: "u3",
    nickname: "냥이집사",
    avatarUrl: gradient("#f472b6", "#ec4899"),
    followers: 2340,
    following: 156,
    challengeCount: 15,
    greeting: "고양이 3마리 키워요",
  },
  {
    id: "u4",
    nickname: "햄찌맘",
    avatarUrl: gradient("#a78bfa", "#8b5cf6"),
    followers: 456,
    following: 89,
    challengeCount: 5,
    greeting: "햄스터 일상",
  },
  {
    id: "u5",
    nickname: "토끼공주",
    avatarUrl: gradient("#34d399", "#10b981"),
    followers: 678,
    following: 123,
    challengeCount: 7,
    greeting: "토끼 두 마리와 함께",
  },
  {
    id: "u6",
    nickname: "앵무마미",
    avatarUrl: gradient("#fb923c", "#ea580c"),
    followers: 321,
    following: 67,
    challengeCount: 3,
    greeting: "앵무새 말하기 챌린지",
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    userId: "u1",
    nickname: "백쌤고양이",
    caption: "동엽강아지 귀여워요 🐱",
    mediaType: "image",
    mediaUrl: gradient("#fbbf24", "#f97316"),
    thumbnailUrl: gradient("#fbbf24", "#f97316"),
    likes: 1234,
    votes: 890,
    dailyVotes: 156,
    createdAt: "2026-06-07T08:00:00",
    isFollowing: true,
  },
  {
    id: "p2",
    userId: "u2",
    nickname: "동엽강아지",
    caption: "용호 강아지 멋있네요 🐾",
    mediaType: "image",
    mediaUrl: gradient("#60a5fa", "#3b82f6"),
    thumbnailUrl: gradient("#60a5fa", "#3b82f6"),
    likes: 856,
    votes: 720,
    dailyVotes: 98,
    createdAt: "2026-06-07T07:30:00",
    isFollowing: true,
  },
  {
    id: "p3",
    userId: "u3",
    nickname: "냥이집사",
    caption: "오늘도 낮잠 타임 😴",
    mediaType: "video",
    mediaUrl: gradient("#f472b6", "#ec4899"),
    thumbnailUrl: gradient("#f472b6", "#ec4899"),
    likes: 2340,
    votes: 1100,
    dailyVotes: 210,
    createdAt: "2026-06-07T06:00:00",
    isFollowing: false,
  },
  {
    id: "p4",
    userId: "u4",
    nickname: "햄찌맘",
    caption: "햄찌 먹방 영상 🥜",
    mediaType: "video",
    mediaUrl: gradient("#a78bfa", "#8b5cf6"),
    thumbnailUrl: gradient("#a78bfa", "#8b5cf6"),
    likes: 567,
    votes: 450,
    dailyVotes: 67,
    createdAt: "2026-06-06T20:00:00",
    isFollowing: true,
  },
  {
    id: "p5",
    userId: "u5",
    nickname: "토끼공주",
    caption: "점프 챌린지 성공!",
    mediaType: "image",
    mediaUrl: gradient("#34d399", "#10b981"),
    thumbnailUrl: gradient("#34d399", "#10b981"),
    likes: 789,
    votes: 620,
    dailyVotes: 89,
    createdAt: "2026-06-06T15:00:00",
    isFollowing: false,
  },
  {
    id: "p6",
    userId: "u6",
    nickname: "앵무마미",
    caption: "안녕하세요 말하기 🦜",
    mediaType: "video",
    mediaUrl: gradient("#fb923c", "#ea580c"),
    thumbnailUrl: gradient("#fb923c", "#ea580c"),
    likes: 432,
    votes: 380,
    dailyVotes: 45,
    createdAt: "2026-06-06T10:00:00",
    isFollowing: true,
  },
];

function sortByVotes(posts: Post[]) {
  return [...posts].sort((a, b) => b.votes - a.votes);
}

export const CURRENT_PERIOD: RankingPeriod = {
  id: "period-current",
  title: "6월 1주차 반려동물 챌린지",
  deadline: "2026-06-14T23:59:59",
  posts: sortByVotes(MOCK_POSTS),
};

export const PREVIOUS_PERIOD: RankingPeriod = {
  id: "period-prev",
  title: "5월 4주차 반려동물 챌린지",
  deadline: "2026-06-07T23:59:59",
  posts: sortByVotes([
    { ...MOCK_POSTS[2], votes: 980 },
    { ...MOCK_POSTS[0], votes: 850 },
    { ...MOCK_POSTS[1], votes: 720 },
    ...MOCK_POSTS.slice(3),
  ]),
};

export const FOLLOWING_USERS = MOCK_USERS.filter((u) =>
  MOCK_POSTS.some((p) => p.userId === u.id && p.isFollowing),
);

export const CURRENT_USER = MOCK_USERS[0];

export function getPostsByTab(
  tab: "uploaded" | "challenged" | "bookmarked" | "draft",
): Post[] {
  switch (tab) {
    case "uploaded":
      return MOCK_POSTS.filter((p) => p.userId === CURRENT_USER.id);
    case "challenged":
      return MOCK_POSTS.filter((p) => p.userId !== CURRENT_USER.id).slice(0, 3);
    case "bookmarked":
      return MOCK_POSTS.slice(1, 4);
    case "draft":
      return [];
    default:
      return [];
  }
}
