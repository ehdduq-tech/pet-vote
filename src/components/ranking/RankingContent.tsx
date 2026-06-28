"use client";

import { useEffect, useState } from "react";
import {
  CURRENT_PERIOD,
  PREVIOUS_PERIOD,
  PREVIOUS_PERIODS,
  getVotingPreviewPosts,
} from "@/lib/mock-data";
import type { Post } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import {
  PodiumTile,
  PostTile,
  PreviousRankingsModal,
  RankingPostDetail,
  TrendingGridModal,
  VotingGridModal,
} from "@/components/ranking/RankingComponents";

const NEXT_WEEK_TOPICS = [
  { id: "funny", title: "웃긴사진 콘테스트", initialVotes: 842 },
  { id: "sleep", title: "잠자는 콘테스트", initialVotes: 615 },
  { id: "bond", title: "유대 콘테스트", initialVotes: 1203 },
] as const;

const TOPIC_VOTES_KEY = "pet-app-next-topic-votes";
const VOTED_TOPICS_KEY = "pet-app-next-topic-voted";

function formatDeadline(deadline: string) {
  const d = new Date(deadline);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} 마감`;
}

function loadTopicVotes(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(TOPIC_VOTES_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveTopicVotes(votes: Record<string, number>) {
  try {
    localStorage.setItem(TOPIC_VOTES_KEY, JSON.stringify(votes));
  } catch {
    // ignore
  }
}

function loadVotedTopics(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(VOTED_TOPICS_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function saveVotedTopics(ids: Set<string>) {
  try {
    localStorage.setItem(VOTED_TOPICS_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore
  }
}

type ModalType = "voting" | "trending" | "previous" | null;

export default function RankingContent() {
  const { posts } = useApp();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [topicVotes, setTopicVotes] = useState<Record<string, number>>({});
  const [votedTopics, setVotedTopics] = useState<Set<string>>(new Set());

  useEffect(() => {
    setTopicVotes(loadTopicVotes());
    setVotedTopics(loadVotedTopics());
  }, []);

  const ranked = [...posts].sort((a, b) => b.votes - a.votes);
  const top3 = ranked.slice(0, 3);
  const votingPreview = getVotingPreviewPosts(posts);
  const dailyRanked = [...posts].sort((a, b) => b.dailyVotes - a.dailyVotes);
  const dailyPreview = dailyRanked.slice(0, 3);
  const prevTop3 = PREVIOUS_PERIOD.posts.slice(0, 3);

  const podiumOrder: Array<{ post: Post; rank: 1 | 2 | 3 } | null> = [
    top3[1] ? { post: top3[1], rank: 2 } : null,
    top3[0] ? { post: top3[0], rank: 1 } : null,
    top3[2] ? { post: top3[2], rank: 3 } : null,
  ];

  const prevPodium: Array<{ post: Post; rank: 1 | 2 | 3 } | null> = [
    prevTop3[1] ? { post: prevTop3[1], rank: 2 } : null,
    prevTop3[0] ? { post: prevTop3[0], rank: 1 } : null,
    prevTop3[2] ? { post: prevTop3[2], rank: 3 } : null,
  ];

  const openDetail = (post: Post) => setSelectedPost(post);

  const getTopicVoteCount = (id: string, initial: number) =>
    topicVotes[id] ?? initial;

  const handleTopicVote = (id: string, initial: number) => {
    const current = getTopicVoteCount(id, initial);

    if (votedTopics.has(id)) {
      const nextVotes = { ...topicVotes };
      const newCount = current - 1;
      if (newCount <= initial) {
        delete nextVotes[id];
      } else {
        nextVotes[id] = newCount;
      }
      setTopicVotes(nextVotes);
      saveTopicVotes(nextVotes);

      const nextVoted = new Set(votedTopics);
      nextVoted.delete(id);
      setVotedTopics(nextVoted);
      saveVotedTopics(nextVoted);
      return;
    }

    const nextVotes = { ...topicVotes, [id]: current + 1 };
    setTopicVotes(nextVotes);
    saveTopicVotes(nextVotes);

    const nextVoted = new Set(votedTopics).add(id);
    setVotedTopics(nextVoted);
    saveVotedTopics(nextVoted);
  };

  return (
    <div className="ranking-page">
      {/* 1. 순위 */}
      <section className="ranking-section">
        <div className="ranking-section-header">
          <h2>순위</h2>
          <span className="text-[10px] font-medium text-red-500">
            {formatDeadline(CURRENT_PERIOD.deadline)}
          </span>
        </div>
        <div className="ranking-podium-row">
          {podiumOrder.map((item) =>
            item ? (
              <PodiumTile
                key={item.post.id}
                post={item.post}
                rank={item.rank}
                onClick={() => openDetail(item.post)}
              />
            ) : null,
          )}
        </div>
      </section>

      {/* 2. 투표중 */}
      <section className="ranking-section">
        <div className="ranking-section-header">
          <h2>투표중</h2>
        </div>
        <div className="ranking-grid-row">
          {votingPreview.map((post) => (
            <PostTile
              key={post.id}
              post={post}
              fill
              onClick={() => setModalType("voting")}
            />
          ))}
        </div>
      </section>

      {/* 3. 인기 급상승 */}
      <section className="ranking-section">
        <div className="ranking-section-header">
          <h2>인기 급상승</h2>
        </div>
        <div className="ranking-grid-row">
          {dailyPreview.map((post) => (
            <PostTile
              key={post.id}
              post={post}
              fill
              onClick={() => setModalType("trending")}
            />
          ))}
        </div>
      </section>

      {/* 4. 이전 순위 */}
      <section className="ranking-section">
        <div className="ranking-section-header">
          <h2>이전 순위</h2>
        </div>
        <div className="ranking-podium-row">
          {prevPodium.map((item) =>
            item ? (
              <PodiumTile
                key={item.post.id}
                post={item.post}
                rank={item.rank}
                onClick={() => setModalType("previous")}
              />
            ) : null,
          )}
        </div>
      </section>

      {/* 5. 다음 주 투표 주제 */}
      <section className="ranking-section ranking-section--topics">
        <div className="ranking-section-header">
          <h2>다음 주 투표 주제</h2>
        </div>
        <ul className="ranking-topics-list">
          {NEXT_WEEK_TOPICS.map((topic) => {
            const count = getTopicVoteCount(topic.id, topic.initialVotes);
            const voted = votedTopics.has(topic.id);

            return (
              <li key={topic.id}>
                <span className="flex-1 text-xs font-medium text-neutral-900">
                  {topic.title}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-neutral-500">
                    {count.toLocaleString()}표
                  </span>
                  <button
                    type="button"
                    onClick={() => handleTopicVote(topic.id, topic.initialVotes)}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      voted
                        ? "bg-neutral-200 text-neutral-500"
                        : "bg-amber-400 text-neutral-900"
                    }`}
                  >
                    {voted ? "투표완료" : "투표"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {modalType === "voting" && (
        <VotingGridModal
          title={`투표중 · ${CURRENT_PERIOD.title}`}
          posts={ranked}
          onClose={() => setModalType(null)}
          onSelectPost={(post) => {
            setModalType(null);
            openDetail(post);
          }}
        />
      )}

      {modalType === "trending" && (
        <TrendingGridModal
          title="인기 급상승 · 오늘"
          posts={dailyRanked}
          onClose={() => setModalType(null)}
          onSelectPost={(post) => {
            setModalType(null);
            openDetail(post);
          }}
        />
      )}

      {modalType === "previous" && (
        <PreviousRankingsModal
          periods={PREVIOUS_PERIODS}
          onClose={() => setModalType(null)}
          onSelectPost={(post) => {
            setModalType(null);
            openDetail(post);
          }}
        />
      )}

      {selectedPost && (
        <RankingPostDetail
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}
