import BottomNav from "@/components/feed/BottomNav";
import PostCard from "@/components/feed/PostCard";
import Stories from "@/components/feed/Stories";
import TopNav from "@/components/feed/TopNav";
const FEED_POSTS = [
  {
    id: "1",
    nickname: "백쌤 고양이",
    likes: 123456789,
    caption: "동엽강아지 귀여워요",
  },
  {
    id: "2",
    nickname: "동엽강아지",
    likes: 128,
    caption: "용호 강아지 멋있네요 🐾",
  },
];

export default function Home() {
  return (
    <div className="mx-auto min-h-full w-full max-w-[470px] bg-white pb-16">
      <TopNav />
      <Stories />
      <main>
        {FEED_POSTS.map((post) => (
          <PostCard
            key={post.id}
            nickname={post.nickname}
            likes={post.likes}
            caption={post.caption}
          />
        ))}
      </main>
      <BottomNav />
    </div>
  );
}
