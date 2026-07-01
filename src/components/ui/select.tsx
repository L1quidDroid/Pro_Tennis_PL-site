import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

/**
 * Styled native <select>. A native control is used deliberately here: it
 * is fully keyboard- and screen-reader-accessible out of the box and adds
 * no runtime dependency, which is all this form needs. Reach for a Radix
 * listbox only if a design calls for custom option rendering.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "flex h-10 w-full appearance-none rounded-md border border-line bg-paper px-3 py-2 pr-9 text-sm text-ink",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-court",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus-visible:ring-red-600",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      />
    </div>
  ),
);
Select.displayName = "Select";

export { Select };
