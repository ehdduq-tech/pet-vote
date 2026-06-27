"use client";

import { Search as SearchIcon } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { MOCK_USERS } from "@/lib/mock-data";

export default function SearchContent() {
  const { posts, searchQuery, setSearchQuery } = useApp();

  const query = searchQuery.trim().toLowerCase();

  const filteredPosts = query
    ? posts.filter(
        (p) =>
          p.nickname.toLowerCase().includes(query) ||
          p.caption.toLowerCase().includes(query),
      )
    : [];

  const filteredUsers = query
    ? MOCK_USERS.filter((u) => u.nickname.toLowerCase().includes(query))
    : [];

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-neutral-200 p-3">
        <div className="flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2">
          <SearchIcon className="h-4 w-4 text-neutral-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="게시물, 회원 아이디 검색"
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
        {!query && (
          <p className="py-8 text-center text-sm text-neutral-400">
            게시물 또는 회원을 검색하세요
          </p>
        )}

        {query && filteredUsers.length > 0 && (
          <section className="mb-4">
            <h3 className="mb-2 text-xs font-bold text-neutral-500">회원</h3>
            <div className="space-y-2">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-neutral-50"
                >
                  <div
                    className="h-10 w-10 rounded-full"
                    style={{ background: user.avatarUrl }}
                  />
                  <div>
                    <p className="text-sm font-semibold">{user.nickname}</p>
                    <p className="text-xs text-neutral-500">
                      팔로워 {user.followers.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {query && filteredPosts.length > 0 && (
          <section>
            <h3 className="mb-2 text-xs font-bold text-neutral-500">게시물</h3>
            <div className="grid grid-cols-3 gap-2">
              {filteredPosts.map((post) => (
                <div key={post.id} className="space-y-1">
                  <div
                    className="aspect-square rounded-lg"
                    style={{ background: post.thumbnailUrl }}
                  />
                  <p className="truncate text-[10px] text-neutral-600">
                    {post.nickname}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {query && filteredUsers.length === 0 && filteredPosts.length === 0 && (
          <p className="py-8 text-center text-sm text-neutral-400">
            검색 결과가 없습니다
          </p>
        )}
      </div>
    </div>
  );
}
