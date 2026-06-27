"use client";

import { useRef, useState } from "react";
import { Camera, ImagePlus, Video, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { CURRENT_USER } from "@/lib/mock-data";
import type { Post } from "@/lib/types";

export default function MediaCapture() {
  const { addPost } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [caption, setCaption] = useState("");
  const [mode, setMode] = useState<"select" | "camera">("select");

  const handleFile = (file: File, type: "image" | "video") => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setMediaType(type);
  };

  const handleUpload = () => {
    if (!preview || !mediaType) return;

    const newPost: Post = {
      id: `p-${Date.now()}`,
      userId: CURRENT_USER.id,
      nickname: CURRENT_USER.nickname,
      caption,
      mediaType,
      mediaUrl: preview,
      thumbnailUrl: preview,
      likes: 0,
      votes: 0,
      dailyVotes: 0,
      createdAt: new Date().toISOString(),
      isFollowing: false,
    };

    addPost(newPost);
    setPreview(null);
    setMediaType(null);
    setCaption("");
    alert("게시물이 업로드되었습니다!");
  };

  if (mode === "camera") {
    return (
      <div className="flex h-full flex-col bg-neutral-900">
        <div className="flex items-center justify-between p-4">
          <button
            type="button"
            onClick={() => setMode("select")}
            className="text-white"
            aria-label="뒤로"
          >
            <X className="h-6 w-6" />
          </button>
          <span className="text-sm font-semibold text-white">카메라</span>
          <div className="w-6" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white"
            aria-label="사진 촬영"
          >
            <Camera className="h-10 w-10" />
          </button>
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-sm font-semibold text-white"
          >
            <Video className="h-5 w-5" />
            동영상 촬영
          </button>
          <p className="text-center text-xs text-white/60">
            촬영한 사진·동영상은 기기에 저장됩니다
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFile(file, "image");
              setMode("select");
            }
          }}
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFile(file, "video");
              setMode("select");
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col p-4">
      {preview ? (
        <div className="flex flex-1 flex-col gap-4">
          <div className="relative flex-1 overflow-hidden rounded-xl bg-neutral-100">
            {mediaType === "video" ? (
              <video
                src={preview}
                className="h-full w-full object-cover"
                controls
              />
            ) : (
              <img
                src={preview}
                alt="미리보기"
                className="h-full w-full object-cover"
              />
            )}
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setMediaType(null);
              }}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white"
              aria-label="삭제"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="게시물 내용을 입력하세요"
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={handleUpload}
            className="rounded-lg bg-neutral-900 py-3 text-sm font-semibold text-white"
          >
            업로드
          </button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <p className="text-sm font-semibold text-neutral-900">
            반려동물 사진·영상 올리기
          </p>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setMode("camera")}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                <Camera className="h-8 w-8 text-neutral-600" />
              </div>
              <span className="text-xs text-neutral-600">카메라</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                <ImagePlus className="h-8 w-8 text-neutral-600" />
              </div>
              <span className="text-xs text-neutral-600">갤러리</span>
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFile(
                  file,
                  file.type.startsWith("video") ? "video" : "image",
                );
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
