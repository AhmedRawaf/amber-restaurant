import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface TooltipItem {
  id: number;
  name: string;
  designation: string;
  emoji?: string;
}

interface AnimatedTooltipProps {
  items: TooltipItem[];
}

export function AnimatedTooltip({ items }: AnimatedTooltipProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-30, 30]),
    springConfig
  );

  const translateX = useSpring(
    useTransform(x, [-100, 100], [-40, 40]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLDivElement;
    const halfWidth = target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-3 flex-wrap">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence mode="wait">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 10 },
                }}
                exit={{ opacity: 0, y: 8, scale: 0.6 }}
                style={{ translateX, rotate }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
              >
                <div className="bg-dark-200 border border-gold/30 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl font-tajawal">
                  <p className="font-bold text-gold">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.designation}</p>
                </div>
                <div className="w-2 h-2 bg-dark-200 border-r border-b border-gold/30 rotate-45 -mt-1" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="w-12 h-12 rounded-full bg-dark-200 border-2 border-dark-400 flex items-center justify-center text-xl cursor-pointer transition-colors duration-200 hover:border-gold/50 font-tajawal"
            whileHover={{ scale: 1.15, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.emoji || item.name.charAt(0)}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
