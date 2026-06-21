import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely, resolving conflicting utility
 * classes in favour of the last one applied. Used throughout the
 * component library — see shadcn/ui docs for the convention.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
