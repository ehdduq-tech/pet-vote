import { DEFAULT_FAMILY_PETS, PET_PHOTOS } from "./mock-data";
import type { FamilyPet } from "./types";

const FAMILY_KEY = "pet-app-family-pets";

/** 이전에 사용하다 404가 난 Unsplash ID */
const LEGACY_BROKEN_PHOTO_IDS = [
  "photo-1495360029569-9315471273af",
  "photo-1583511655857-d81342dfeda1",
  "photo-1574159622686-611b078f17a8",
  "photo-1558787533-047468894180",
];

function isMungmungPet(pet: FamilyPet) {
  return (
    pet.id === "pet-mungmung" ||
    pet.name === "멍멍이" ||
    pet.name === "멍뭉이"
  );
}

function isBrokenPhotoUrl(url: string) {
  if (!url) return true;
  if (LEGACY_BROKEN_PHOTO_IDS.some((id) => url.includes(id))) return true;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
    return false;
  }
  if (url.startsWith("data:image") && url.length > 200) {
    return false;
  }
  return true;
}

function normalizeFamilyPets(pets: FamilyPet[]): FamilyPet[] {
  const normalized = pets.map((pet) => {
    if (isMungmungPet(pet)) {
      return {
        ...DEFAULT_FAMILY_PETS[0],
        ...pet,
        photoUrl: PET_PHOTOS.dogPuppy,
      };
    }
    if (isBrokenPhotoUrl(pet.photoUrl)) {
      return { ...pet, photoUrl: PET_PHOTOS.dogPuppy };
    }
    return pet;
  });

  const hasMungmung = normalized.some(isMungmungPet);
  if (!hasMungmung) {
    return [...DEFAULT_FAMILY_PETS, ...normalized];
  }

  return normalized;
}

export function loadFamilyPets(): FamilyPet[] {
  if (typeof window === "undefined") return DEFAULT_FAMILY_PETS;
  try {
    const raw = localStorage.getItem(FAMILY_KEY);
    if (!raw) return DEFAULT_FAMILY_PETS;
    const saved = JSON.parse(raw) as FamilyPet[];
    if (saved.length === 0) return DEFAULT_FAMILY_PETS;
    return normalizeFamilyPets(saved);
  } catch {
    return DEFAULT_FAMILY_PETS;
  }
}

export function saveFamilyPets(pets: FamilyPet[]) {
  try {
    localStorage.setItem(FAMILY_KEY, JSON.stringify(pets));
  } catch {
    // ignore
  }
}
