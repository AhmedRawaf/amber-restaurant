import { cn } from "@/lib/utils";

interface ReviewItem {
  quote: string;
  name: string;
  title: string;
  rating?: number;
}

interface Props {
  items: ReviewItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

const DURATION: Record<string, string> = { fast: "10s", normal: "20s", slow: "35s" };

function ReviewCard({ item }: { item: ReviewItem }) {
  return (
    <li
      className="w-[340px] max-w-full shrink-0 border rounded-2xl px-7 py-6 mx-2.5"
      style={{ background: "#fff9ed", borderColor: "#e8d9b0", pointerEvents: "none" }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-3" dir="ltr">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={cn("w-3.5 h-3.5", i < (item.rating ?? 5) ? "text-gold" : "text-uber-gray2")}
            fill="currentColor" viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>

      <p className="font-tajawal text-sm leading-relaxed line-clamp-3 mb-5" style={{ color: "#2C1610" }}>
        &ldquo;{item.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: "#e8d9b0" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "#a73a00" }}>
          <span className="text-white text-xs font-bold font-tajawal">
            {item.name.charAt(0)}
          </span>
        </div>
        <p className="text-black font-bold font-tajawal text-sm leading-none">{item.name}</p>
      </div>
    </li>
  );
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: Props) {
  const duration = DURATION[speed];
  const animDir  = direction === "right" ? "reverse" : "normal";
  const id       = `marquee-${direction}-${speed}`;

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
      style={{ direction: "ltr" }}
    >
      <style>{`
        @keyframes ${id} {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .${id}-track {
          display: flex;
          width: max-content;
          white-space: nowrap;
          animation: ${id} ${duration} ${animDir} linear infinite;
        }
        ${pauseOnHover ? `.${id}-track:hover { animation-play-state: paused; }` : ""}
      `}</style>

      {/* Two identical sets — when first scrolls out, second is already in place */}
      <ul className={`${id}-track py-2`}>
        {items.map((item, idx) => <ReviewCard key={`a-${idx}`} item={item} />)}
        {items.map((item, idx) => <ReviewCard key={`b-${idx}`} item={item} />)}
      </ul>
    </div>
  );
}
