import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-md border border-line bg-paper px-3 py-2 text-base text-ink",
        "placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-court",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus-visible:ring-red-600",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
