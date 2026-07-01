import * as React from "react";

import { cn } from "@/lib/utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

// Reusable primitive: the associated control is supplied by callers via
// `htmlFor`, which this lint rule can't verify statically.
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      ref={ref}
      className={cn("block text-sm font-medium text-ink", className)}
      {...props}
    />
  ),
);
Label.displayName = "Label";

export { Label };
