import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_SOURCES = {
  /** Icon only — compact header use. */
  mark: "/logo/pinlay-mark.svg",
  /** Mark + PIN wordmark, no tagline. */
  wordmark: "/logo/pinlay-wordmark.svg",
  /** Full lockup including tagline. */
  full: "/logo/pinlay-full.svg",
} as const;

type LogoVariant = keyof typeof LOGO_SOURCES | "onDark";

type LogoProps = {
  className?: string;
  /**
   * - `mark` — circles only, for the nav bar
   * - `wordmark` — icon + PIN, for hero and footer
   * - `full` — includes tagline
   * - `onDark` — wordmark on a light badge for dark surfaces
   */
  variant?: LogoVariant;
};

const SIZE_PRESETS: Record<LogoVariant, string> = {
  mark: "h-11 w-auto sm:h-12",
  wordmark: "h-20 w-auto sm:h-24 md:h-28",
  full: "h-24 w-auto sm:h-28 md:h-32",
  onDark: "h-16 w-auto sm:h-20",
};

export function Logo({ className, variant = "wordmark" }: LogoProps) {
  const sourceVariant = variant === "onDark" ? "wordmark" : variant;
  const src = LOGO_SOURCES[sourceVariant];

  const image = (
    <Image
      src={src}
      alt="PinLay"
      width={sourceVariant === "mark" ? 120 : 320}
      height={sourceVariant === "mark" ? 120 : 120}
      className={cn(SIZE_PRESETS[variant], className)}
      priority={variant === "mark" || variant === "wordmark"}
    />
  );

  if (variant === "onDark") {
    return (
      <span className="inline-flex rounded-xl bg-paper px-4 py-3">{image}</span>
    );
  }

  return image;
}
