"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Tension calibration control. Replaces a bare number input with a
 * draggable stringbed: as tension rises the strings pull taut (less bow)
 * and warm from line-gray toward trophy gold; plucking them (dragging)
 * injects a hum that decays like a real string. The number is the source
 * of truth — the visual is an honest read-out of it, not decoration.
 *
 * Accessibility: the handle is a real `role="slider"` with full keyboard
 * support and aria-value* wiring. Under prefers-reduced-motion the hum is
 * suppressed; the taut/loose bow is a static shape (not motion), so the
 * tension is still legible without any animation.
 */

const GOLD: RGB = [201, 162, 39]; // #C9A227
const LOOSE: RGB = [154, 150, 138]; // desaturated line/muted blend

type RGB = [number, number, number];

const STRING_COUNT = 15;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mix(a: RGB, b: RGB, t: number): string {
  const r = Math.round(lerp(a[0], b[0], t));
  const g = Math.round(lerp(a[1], b[1], t));
  const bl = Math.round(lerp(a[2], b[2], t));
  return `rgb(${r}, ${g}, ${bl})`;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export interface TensionSliderProps {
  id: string;
  label: string;
  value: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (next: number) => void;
  onBlur?: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  invalid?: boolean;
  describedById?: string;
}

export function TensionSlider({
  id,
  label,
  value,
  onChange,
  onBlur,
  min = 30,
  max = 70,
  disabled = false,
  invalid = false,
  describedById,
}: TensionSliderProps) {
  const reduced = usePrefersReducedMotion();
  const trackRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [dragging, setDragging] = React.useState(false);

  // Animation state kept in refs so the rAF loop never triggers React renders.
  const energyRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const tensionRef = React.useRef(0);
  const draggingRef = React.useRef(false);
  const sizeRef = React.useRef({ w: 0, h: 0, dpr: 1 });

  const ratio = (value - min) / (max - min);
  tensionRef.current = ratio;

  const clampRound = React.useCallback(
    (v: number) => Math.max(min, Math.min(max, Math.round(v))),
    [min, max],
  );

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { w, h, dpr } = sizeRef.current;
    if (w === 0) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const t = tensionRef.current;
    const energy = energyRef.current;
    const padX = 14;
    const padY = 10;
    const usableW = w - padX * 2;
    const usableH = h - padY * 2;
    const spacing = usableW / (STRING_COUNT - 1);
    // Taut strings bow less. Loose strings bow up to ~10px.
    const baseBow = lerp(11, 0.6, t);
    const handleX = padX + usableW * t;
    const now = performance.now();

    for (let i = 0; i < STRING_COUNT; i++) {
      const x = padX + i * spacing;
      const topY = padY;
      const botY = padY + usableH;
      const proximity = Math.max(
        0,
        1 - Math.abs(x - handleX) / (usableW * 0.55),
      );
      const hum = reduced
        ? 0
        : Math.sin(now / 42 + i * 0.9) * energy * proximity * 9;
      // Loose strings sag toward the player (rightward bow); the hum rides on top.
      const bow =
        baseBow * (0.5 + 0.5 * Math.sin((i / (STRING_COUNT - 1)) * Math.PI));
      const ctrlX = x + bow + hum;
      const midY = (topY + botY) / 2;

      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.quadraticCurveTo(ctrlX, midY, x, botY);
      ctx.strokeStyle = mix(LOOSE, GOLD, t);
      ctx.globalAlpha = lerp(0.5, 0.95, t);
      ctx.lineWidth = lerp(1, 1.6, t);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }, [reduced]);

  const loop = React.useCallback(() => {
    energyRef.current *= 0.92;
    draw();
    if (draggingRef.current || energyRef.current > 0.004) {
      rafRef.current = requestAnimationFrame(loop);
    } else {
      energyRef.current = 0;
      rafRef.current = null;
      draw(); // settle on a clean static frame
    }
  }, [draw]);

  const kick = React.useCallback(
    (amount: number) => {
      if (reduced) {
        draw();
        return;
      }
      energyRef.current = Math.min(1, energyRef.current + amount);
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(loop);
    },
    [draw, loop, reduced],
  );

  // Size the canvas to its box (DPR-aware) and redraw on resize.
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!canvas || !track) return;
    const ro = new ResizeObserver(() => {
      const rect = track.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      sizeRef.current = { w: rect.width, h: rect.height, dpr };
      draw();
    });
    ro.observe(track);
    return () => ro.disconnect();
  }, [draw]);

  // Redraw the static frame whenever the value changes without a drag kick.
  React.useEffect(() => {
    if (rafRef.current == null) draw();
  }, [value, draw]);

  React.useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const setFromClientX = React.useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const r = (clientX - rect.left) / rect.width;
      const next = clampRound(min + r * (max - min));
      if (next !== value) {
        onChange(next);
        kick(0.5);
      }
    },
    [clampRound, kick, max, min, onChange, value],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    draggingRef.current = true;
    setDragging(true);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  };
  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    kick(0.35);
    onBlur?.();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    let next = value;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        next = clampRound(value - 1);
        break;
      case "ArrowRight":
      case "ArrowUp":
        next = clampRound(value + 1);
        break;
      case "PageDown":
        next = clampRound(value - 5);
        break;
      case "PageUp":
        next = clampRound(value + 5);
        break;
      case "Home":
        next = min;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }
    e.preventDefault();
    if (next !== value) {
      onChange(next);
      kick(0.45);
    }
  };

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span id={`${id}-label`} className="text-sm font-medium text-ink">
          {label}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "font-mono text-sm tabular-nums transition-colors",
            disabled ? "text-muted" : "text-ink",
          )}
        >
          {/* Ink keeps the number crisp and AA-legible; the gray→gold
              tension signal lives in the strings, not the digits. */}
          <span className="text-lg font-semibold">{value}</span> lbs
        </span>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          "relative mt-2 h-16 touch-none select-none rounded-md border bg-paper",
          invalid ? "border-red-600" : "border-line",
          disabled ? "cursor-not-allowed opacity-55" : "cursor-ew-resize",
        )}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />
        {/* The calibration clamp — the visible handle. */}
        <div
          id={id}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-labelledby={`${id}-label`}
          aria-describedby={describedById}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={`${value} pounds`}
          aria-disabled={disabled || undefined}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          className={cn(
            "absolute top-1/2 z-10 h-12 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
            "border border-paper bg-ink shadow-sm outline-none",
            "after:absolute after:inset-x-0 after:top-1/2 after:mx-auto after:h-4 after:w-[3px] after:-translate-y-1/2 after:rounded-full after:bg-paper/70 after:content-['']",
            dragging && "ring-2 ring-gold ring-offset-1 ring-offset-paper",
            "focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1 focus-visible:ring-offset-paper",
          )}
          style={{ left: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}
