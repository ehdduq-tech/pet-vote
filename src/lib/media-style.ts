import type { CSSProperties } from "react";

export function mediaBackgroundStyle(source: string): CSSProperties {
  if (
    source.startsWith("http://") ||
    source.startsWith("https://") ||
    source.startsWith("/")
  ) {
    return {
      backgroundImage: `url("${source}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }

  return { background: source };
}
