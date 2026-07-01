import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Shown on dark surfaces (footer) inside a light badge so the mark stays legible. */
  variant?: "default" | "onDark";
};

const SIZE_PRESETS: Record<NonNullable<LogoProps["variant"]>, string> = {
  default: "h-14 w-auto sm:h-16",
  onDark: "h-16 w-auto sm:h-20",
};

export function Logo({ className, variant = "default" }: LogoProps) {
  const image = (
    <Image
      src="/logo/pinlay.svg"
      alt="PinLay"
      width={1455}
      height={990}
      className={cn(SIZE_PRESETS[variant], className)}
      priority={variant === "default"}
    />
  );

  if (variant === "onDark") {
    return (
      <span className="inline-flex rounded-xl bg-paper px-4 py-3">{image}</span>
    );
  }

  return image;
}
