"use client";

import { useEffect, useRef } from "react";
import { mediaBackgroundStyle } from "@/lib/media-style";
import type { Post } from "@/lib/types";

const VIDEO_CLIP_SECONDS = 5;

type PostMediaProps = {
  post: Pick<Post, "mediaType" | "mediaUrl" | "thumbnailUrl">;
  className?: string;
  play?: boolean;
  ariaLabel?: string;
  clipSeconds?: number;
};

export default function PostMedia({
  post,
  className = "absolute inset-0 h-full w-full object-cover",
  play = false,
  ariaLabel,
  clipSeconds = VIDEO_CLIP_SECONDS,
}: PostMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || post.mediaType !== "video") return;

    video.currentTime = 0;
    if (play) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [post.mediaType, post.mediaUrl, play]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || video.currentTime < clipSeconds) return;
    video.currentTime = 0;
    if (play) {
      video.play().catch(() => {});
    }
  };

  if (post.mediaType === "video") {
    return (
      <video
        ref={videoRef}
        src={post.mediaUrl}
        className={className}
        muted
        playsInline
        preload="metadata"
        autoPlay={play}
        aria-label={ariaLabel}
        onLoadedData={(event) => {
          event.currentTarget.currentTime = 0;
          if (!play) event.currentTarget.pause();
        }}
        onTimeUpdate={play ? handleTimeUpdate : undefined}
      />
    );
  }

  return (
    <div
      className={className}
      style={mediaBackgroundStyle(post.thumbnailUrl || post.mediaUrl)}
      role="img"
      aria-label={ariaLabel}
    />
  );
}

export { VIDEO_CLIP_SECONDS };
