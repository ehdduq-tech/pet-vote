"use client";

import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { mediaBackgroundStyle } from "@/lib/media-style";
import type { FamilyPet } from "@/lib/types";

type FamilyPetDetailModalProps = {
  pet: FamilyPet;
  onClose: () => void;
};

export function FamilyPetDetailModal({ pet, onClose }: FamilyPetDetailModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
      <div className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl bg-neutral-900 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 z-20 rounded-full bg-black/50 p-1 text-white"
          aria-label="닫기"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="relative aspect-[3/4] w-full">
          <div
            className="absolute inset-0"
            style={mediaBackgroundStyle(pet.photoUrl)}
            role="img"
            aria-label={pet.name}
          />
          <div className="absolute inset-x-0 bottom-0 space-y-0.5 bg-gradient-to-t from-black/85 via-black/60 to-transparent px-3 pb-3 pt-8 text-white">
            <p className="text-sm font-bold">{pet.name}</p>
            <p className="text-[11px] text-white/90">품종 · {pet.breed || "-"}</p>
            <p className="text-[11px] text-white/90">성별 · {pet.gender || "-"}</p>
            <p className="text-[11px] text-white/90">나이 · {pet.age || "-"}</p>
            {pet.notes && (
              <p className="text-[11px] text-white/80">특이사항 · {pet.notes}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type FamilyPetFormModalProps = {
  photoUrl: string;
  onClose: () => void;
  onSave: (data: Omit<FamilyPet, "id" | "photoUrl">) => void;
};

export function FamilyPetFormModal({
  photoUrl,
  onClose,
  onSave,
}: FamilyPetFormModalProps) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), breed, gender, age, notes });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50">
      <div className="w-full max-w-[470px] rounded-t-2xl bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-neutral-900">가족 등록</h2>
          <button type="button" onClick={onClose} aria-label="닫기">
            <X className="h-5 w-5 text-neutral-500" />
          </button>
        </div>
        <div
          className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-neutral-200"
          style={mediaBackgroundStyle(photoUrl)}
        />
        <div className="space-y-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 *"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none"
          />
          <input
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            placeholder="품종"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none"
          />
          <input
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="성별"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none"
          />
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="나이"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none"
          />
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="특이사항"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 w-full rounded-full bg-neutral-900 py-2.5 text-sm font-bold text-white"
        >
          저장
        </button>
      </div>
    </div>
  );
}

/** 프로필 소개글 아래 — 사진만 (원형, 한 줄 5개) */
export function FamilyPhotoStrip({
  onSelectPet,
}: {
  onSelectPet: (pet: FamilyPet) => void;
}) {
  const { familyPets } = useApp();

  if (familyPets.length === 0) return null;

  const rows: FamilyPet[][] = [];
  for (let i = 0; i < familyPets.length; i += 5) {
    rows.push(familyPets.slice(i, i + 5));
  }

  return (
    <div className="mt-3 space-y-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-2">
          {row.map((pet) => (
            <button
              key={pet.id}
              type="button"
              onClick={() => onSelectPet(pet)}
              className="aspect-square overflow-hidden rounded-full border-2 border-neutral-200"
              style={mediaBackgroundStyle(pet.photoUrl)}
              aria-label={pet.name}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/** family 탭 — 3열 사각 그리드, 추가 버튼은 맨 뒤 */
export function FamilyPetGrid({
  onSelectPet,
}: {
  onSelectPet: (pet: FamilyPet) => void;
}) {
  const { familyPets, addFamilyPet } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pendingPhoto, setPendingPhoto] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPendingPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-0.5 p-0.5">
        {familyPets.map((pet) => (
          <button
            key={pet.id}
            type="button"
            onClick={() => onSelectPet(pet)}
            className="relative aspect-square overflow-hidden bg-neutral-100"
            aria-label={pet.name}
          >
            <div
              className="absolute inset-0"
              style={mediaBackgroundStyle(pet.photoUrl)}
              role="img"
              aria-hidden
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="relative flex aspect-square items-center justify-center bg-neutral-50 text-neutral-400"
          aria-label="사진 및 정보 추가"
        >
          <Plus className="h-8 w-8" strokeWidth={1.5} />
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {pendingPhoto && (
        <FamilyPetFormModal
          photoUrl={pendingPhoto}
          onClose={() => setPendingPhoto(null)}
          onSave={(data) => addFamilyPet({ ...data, photoUrl: pendingPhoto })}
        />
      )}
    </>
  );
}
