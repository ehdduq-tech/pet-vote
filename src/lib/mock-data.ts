import type { Post, RankingPeriod, User, ProfileTab, ProfilePost, FamilyPet } from "./types";

const unsplash = (photoId: string, width = 800) =>
  `https://images.unsplash.com/${photoId}?w=${width}&q=80`;

/** Unsplash — 강아지·고양이·토끼 사진 (URL 200 응답 확인됨) */
export const PET_PHOTOS = {
  catOrange: unsplash("photo-1514888286974-6c03e2ca1dba"),
  catTabby: unsplash("photo-1518791841217-8f162f1e1131"),
  catWhite: unsplash("photo-1529778873920-4da4926a72c2"),
  dogGolden: unsplash("photo-1587300003388-59208cc962cb"),
  dogBulldog: unsplash("photo-1552053831-71594a27632d"),
  dogHusky: unsplash("photo-1530281700549-e82e7bf110d6"),
  dogPuppy: unsplash("photo-1548767797-d8c844163c4c"),
  rabbit: unsplash("photo-1585110396000-c9ffd4e4b308"),
} as const;

/** 로컬 반려동물 영상 (썸네일은 영상 첫 프레임) */
export const PET_VIDEOS = {
  demo: "/videos/pet-demo.mp4",
} as const;

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    nickname: "백쌤고양이",
    avatarUrl: PET_PHOTOS.catOrange,
    followers: 1280,
    following: 342,
    challengeCount: 12,
    greeting: "우리 막내 자랑하는 공간 🐾",
  },
  {
    id: "u2",
    nickname: "동엽강아지",
    avatarUrl: PET_PHOTOS.dogGolden,
    followers: 890,
    following: 210,
    challengeCount: 8,
    greeting: "산책 좋아하는 댕댕이",
  },
  {
    id: "u3",
    nickname: "냥이집사",
    avatarUrl: PET_PHOTOS.catTabby,
    followers: 2340,
    following: 156,
    challengeCount: 15,
    greeting: "고양이 3마리 키워요",
  },
  {
    id: "u4",
    nickname: "햄찌맘",
    avatarUrl: PET_PHOTOS.dogBulldog,
    followers: 456,
    following: 89,
    challengeCount: 5,
    greeting: "햄스터 일상",
  },
  {
    id: "u5",
    nickname: "토끼공주",
    avatarUrl: PET_PHOTOS.rabbit,
    followers: 678,
    following: 123,
    challengeCount: 7,
    greeting: "토끼 두 마리와 함께",
  },
  {
    id: "u6",
    nickname: "앵무마미",
    avatarUrl: PET_PHOTOS.dogHusky,
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
    mediaUrl: PET_PHOTOS.catOrange,
    thumbnailUrl: PET_PHOTOS.catOrange,
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
    mediaUrl: PET_PHOTOS.dogGolden,
    thumbnailUrl: PET_PHOTOS.dogGolden,
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
    mediaUrl: PET_VIDEOS.demo,
    thumbnailUrl: PET_VIDEOS.demo,
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
    mediaUrl: PET_VIDEOS.demo,
    thumbnailUrl: PET_VIDEOS.demo,
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
    mediaUrl: PET_PHOTOS.rabbit,
    thumbnailUrl: PET_PHOTOS.rabbit,
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
    mediaUrl: PET_VIDEOS.demo,
    thumbnailUrl: PET_VIDEOS.demo,
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
  year: 2026,
  round: 5,
  deadline: "2026-06-14T23:59:59",
  posts: sortByVotes(MOCK_POSTS),
};

export const PREVIOUS_PERIOD: RankingPeriod = {
  id: "period-prev",
  title: "5월 4주차 반려동물 챌린지",
  year: 2026,
  round: 4,
  deadline: "2026-06-07T23:59:59",
  posts: sortByVotes([
    { ...MOCK_POSTS[2], votes: 980 },
    { ...MOCK_POSTS[0], votes: 850 },
    { ...MOCK_POSTS[1], votes: 720 },
    ...MOCK_POSTS.slice(3),
  ]),
};

export const PREVIOUS_PERIODS: RankingPeriod[] = [
  PREVIOUS_PERIOD,
  {
    id: "period-prev-2",
    title: "5월 3주차 반려동물 챌린지",
    year: 2026,
    round: 3,
    deadline: "2026-05-31T23:59:59",
    posts: sortByVotes([
      { ...MOCK_POSTS[1], votes: 920 },
      { ...MOCK_POSTS[4], votes: 810 },
      { ...MOCK_POSTS[3], votes: 760 },
    ]),
  },
  {
    id: "period-prev-3",
    title: "5월 2주차 반려동물 챌린지",
    year: 2026,
    round: 2,
    deadline: "2026-05-24T23:59:59",
    posts: sortByVotes([
      { ...MOCK_POSTS[0], votes: 1050 },
      { ...MOCK_POSTS[5], votes: 880 },
      { ...MOCK_POSTS[2], votes: 790 },
    ]),
  },
  {
    id: "period-prev-4",
    title: "5월 1주차 반려동물 챌린지",
    year: 2025,
    round: 12,
    deadline: "2026-05-17T23:59:59",
    posts: sortByVotes([
      { ...MOCK_POSTS[3], votes: 940 },
      { ...MOCK_POSTS[1], votes: 870 },
      { ...MOCK_POSTS[0], votes: 820 },
    ]),
  },
];

export const FOLLOWING_USERS = MOCK_USERS.filter((u) =>
  MOCK_POSTS.some((p) => p.userId === u.id && p.isFollowing),
);

export const CURRENT_USER = MOCK_USERS[0];

/** family 탭 기본 반려동물 */
export const DEFAULT_FAMILY_PETS: FamilyPet[] = [
  {
    id: "pet-mungmung",
    name: "멍멍이",
    breed: "골든 리트리버",
    gender: "남",
    age: "3살",
    notes: "산책을 좋아해요",
    photoUrl: PET_PHOTOS.dogPuppy,
  },
];

export function getUserById(userId: string) {
  return MOCK_USERS.find((user) => user.id === userId);
}

/** 투표중 영역 — 현재 기간 4~6위 (토끼공주 등 고정) */
export function getVotingPreviewPosts(livePosts: Post[]): Post[] {
  return CURRENT_PERIOD.posts.slice(3, 6).map(
    (post) => livePosts.find((live) => live.id === post.id) ?? post,
  );
}

export function getPostsByTab(
  tab: ProfileTab,
  allPosts: Post[],
  bookmarkedIds?: Set<string>,
): ProfilePost[] {
  const ranked = [...allPosts].sort((a, b) => b.votes - a.votes);
  const rankMap = new Map(ranked.map((post, index) => [post.id, index + 1]));

  switch (tab) {
    case "uploaded":
      return allPosts.filter((post) => post.userId === CURRENT_USER.id);
    case "ranking":
      return allPosts
        .filter((post) => post.userId === CURRENT_USER.id)
        .map((post) => ({ ...post, rank: rankMap.get(post.id) }))
        .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999));
    case "challenged":
      return allPosts.filter((post) => post.userId !== CURRENT_USER.id).slice(0, 3);
    case "bookmarked":
      return bookmarkedIds
        ? allPosts.filter((post) => bookmarkedIds.has(post.id))
        : [];
    case "draft":
    case "family":
      return [];
    default:
      return [];
  }
}
