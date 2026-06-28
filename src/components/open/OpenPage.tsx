"use client";

import { APP_NAME } from "@/lib/constants";
import { CURRENT_PERIOD } from "@/lib/mock-data";
import PostMedia from "@/components/media/PostMedia";
import { useApp } from "@/context/AppContext";

const SIGNUP_OPTIONS = [
  { id: "google", label: "Google" },
  { id: "kakao", label: "카카오" },
  { id: "naver", label: "네이버" },
  { id: "signup", label: "회원가입" },
] as const;

export default function OpenPage() {
  const { login } = useApp();

  const ranked = [...CURRENT_PERIOD.posts].sort((a, b) => b.votes - a.votes);
  const top3 = ranked.slice(0, 3);
  const podiumOrder = [top3[1], top3[0], top3[2]] as const;
  const podiumRanks = [2, 1, 3];

  const handleSignup = () => {
    login();
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-[470px] flex-col bg-white">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        <h1 className="text-2xl font-black tracking-wide text-neutral-900">
          {APP_NAME}
        </h1>
        <p className="mt-1 text-xs text-neutral-500">반려동물 사진 투표 SNS</p>

        <div className="mt-8 flex items-end justify-center gap-3">
          {podiumOrder.map((post, i) => {
            if (!post) return null;
            const rank = podiumRanks[i];
            const sizeClass =
              rank === 1 ? "h-28 w-28" : rank === 2 ? "h-20 w-20" : "h-16 w-16";

            return (
              <div key={post.id} className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-neutral-600">
                  {rank}위
                </span>
                <div
                  className={`relative ${sizeClass} overflow-hidden rounded-xl shadow-md ring-2 ring-white`}
                >
                  <PostMedia
                    post={post}
                    className="absolute inset-0 h-full w-full object-cover"
                    ariaLabel={`${rank}위 ${post.nickname}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-center text-xs text-neutral-500">
          {CURRENT_PERIOD.title}
        </p>
      </div>

      <div className="border-t border-neutral-200 px-4 pb-6 pt-4">
        <div className="grid grid-cols-2 gap-2">
          {SIGNUP_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={handleSignup}
              className="rounded-xl border border-neutral-200 bg-white py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 active:bg-neutral-100"
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-neutral-400">
          소셜 연동은 준비 중입니다. 선택 시 데모 로그인됩니다.
        </p>
      </div>
    </div>
  );
}
