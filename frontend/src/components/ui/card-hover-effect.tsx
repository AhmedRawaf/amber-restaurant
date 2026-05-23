import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MenuItem } from "@/types";

export function HoverEffect({ items, className }: { items: MenuItem[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered]   = useState(false);

  useEffect(() => { setImgError(false); }, [item.image_url]);

  const fallbackColors: Record<string, string> = {
    appetizers: "#F0FDF4",
    mains:      "#FFFBEB",
    desserts:   "#FFF1F2",
    drinks:     "#F0F9FF",
  };

  return (
    <motion.div
      className="uber-card flex flex-col bg-white cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ y: hovered ? -4 : 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden rounded-t-2xl" style={{ height: "210px" }}>
        {item.image_url && !imgError ? (
          <img
            src={item.image_url}
            alt={item.name_ar || item.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-5xl"
            style={{ background: fallbackColors[item.category] ?? "#F6F6F6" }}
          >
            <span className="opacity-30">
              {item.category === "appetizers" && "🥗"}
              {item.category === "mains"      && "🍖"}
              {item.category === "desserts"   && "🍮"}
              {item.category === "drinks"     && "☕"}
            </span>
          </div>
        )}

        {item.is_featured && (
          <div className="absolute top-3 right-3 text-white text-[11px] font-bold px-3 py-1 rounded-full font-tajawal" style={{ background: "#a73a00" }}>
            مميز
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-black font-bold text-base leading-snug font-tajawal truncate">
              {item.name_ar || item.name}
            </h3>
            <p className="text-uber-gray4 text-xs mt-0.5 font-tajawal truncate">{item.name}</p>
          </div>
          <div className="shrink-0 text-left">
            <span className="text-black font-black text-lg font-tajawal">{Number(item.price).toFixed(0)}</span>
            <span className="text-uber-gray4 text-xs mr-0.5 font-tajawal"> ريال</span>
          </div>
        </div>

        <p className="text-uber-gray4 text-sm leading-relaxed font-tajawal line-clamp-2 flex-1">
          {item.description_ar || item.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-uber-border text-xs text-uber-gray4 font-tajawal">
          <span>🔥</span>
          {item.calories && <span>{item.calories} سعرة</span>}
          {item.prep_time && (
            <span className="mr-auto flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {item.prep_time} دقيقة
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
