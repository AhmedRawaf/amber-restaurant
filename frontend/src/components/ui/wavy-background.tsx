import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
import { cn } from "@/lib/utils";

interface WavyBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
}

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors = ["#FFD700", "#D4AF37", "#B8860B", "#FFA500", "#FF8C00"],
  waveWidth = 60,
  backgroundFill = "#0D0D0D",
  blur = 12,
  speed = "slow",
  waveOpacity = 0.4,
}: WavyBackgroundProps) {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);
  const ntRef = useRef(0);

  const getSpeed = () => (speed === "fast" ? 0.002 : 0.0008);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let h = (canvas.height = canvas.offsetHeight || window.innerHeight);

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth || window.innerWidth;
      h = canvas.height = canvas.offsetHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const drawWave = (n: number) => {
      ntRef.current += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = colors[i % colors.length];
        for (let x = 0; x < w; x += 4) {
          const y = noise(x / 900, 0.4 * i, ntRef.current) * 120;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = waveOpacity;
      drawWave(5);
      animationIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationIdRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    );
  }, []);

  return (
    <div className={cn("relative flex flex-col items-center justify-center overflow-hidden", containerClassName)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full"
        style={isSafari ? { filter: `blur(${blur}px)` } : { filter: `blur(${blur}px)` }}
      />
      <div className={cn("relative z-10 w-full", className)}>{children}</div>
    </div>
  );
}
