export type Notification = {
  id: string;
  postId: string;
  nickname: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    postId: "p2",
    nickname: "동엽강아지",
    message: "동엽강아지님이 새 게시물을 올렸습니다",
    createdAt: "2026-06-07T09:30:00",
    read: false,
  },
  {
    id: "n2",
    postId: "p3",
    nickname: "냥이집사",
    message: "냥이집사님이 새 게시물을 올렸습니다",
    createdAt: "2026-06-07T08:15:00",
    read: false,
  },
  {
    id: "n3",
    postId: "p4",
    nickname: "햄찌맘",
    message: "햄찌맘님이 새 게시물을 올렸습니다",
    createdAt: "2026-06-06T21:00:00",
    read: true,
  },
  {
    id: "n4",
    postId: "p5",
    nickname: "토끼공주",
    message: "토끼공주님이 새 게시물을 올렸습니다",
    createdAt: "2026-06-06T18:40:00",
    read: true,
  },
];
