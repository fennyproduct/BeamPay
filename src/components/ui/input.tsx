import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-neon-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-900 focus-visible:border-neon-900 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:text-white dark:hover:border-white dark:focus-visible:ring-white dark:focus-visible:border-white",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
