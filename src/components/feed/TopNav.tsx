import { Camera, Send } from "lucide-react";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3">
      <button type="button" aria-label="카메라" className="text-neutral-900">
        <Camera className="h-6 w-6" strokeWidth={1.75} />
      </button>
      <button type="button" aria-label="메시지" className="text-neutral-900">
        <Send className="h-6 w-6" strokeWidth={1.75} />
      </button>
    </header>
  );
}
