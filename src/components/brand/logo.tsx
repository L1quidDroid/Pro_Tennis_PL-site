import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Height-driven sizing; width scales with the SVG aspect ratio. */
  className?: string;
  /** Shown on dark surfaces (footer) inside a light badge so the mark stays legible. */
  variant?: "default" | "onDark";
};

export function Logo({ className, variant = "default" }: LogoProps) {
  const image = (
    <Image
      src="/logo/pinlay.svg"
      alt="PinLay"
      width={120}
      height={40}
      className={cn("h-10 w-auto", className)}
      priority
    />
  );

  if (variant === "onDark") {
    return (
      <span className="inline-flex rounded-xl bg-paper px-3 py-2">{image}</span>
    );
  }

  return image;
}
