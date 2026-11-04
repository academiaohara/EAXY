import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-20 w-full rounded-xl border border-border bg-paper-raised px-3 py-2.5 text-base transition-colors outline-none placeholder:text-ink-muted focus-visible:border-ink/45 focus-visible:ring-3 focus-visible:ring-cobalt/20 disabled:cursor-not-allowed disabled:bg-cobalt-tint/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
