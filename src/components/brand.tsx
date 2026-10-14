import { cn } from "@/lib/utils"

/** Marca: o sol a nascer sobre duas ondas. Geometria simples, desenhada para o site. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("shrink-0", className)} aria-hidden>
      <path d="M8 22a12 12 0 0 1 24 0Z" fill="var(--color-telha)" />
      <path
        d="M3 27c4.5 0 4.5-3 9-3s4.5 3 9 3 4.5-3 9-3 4.5 3 7 3"
        fill="none"
        stroke="var(--color-lagoa)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M3 33c4.5 0 4.5-3 9-3s4.5 3 9 3 4.5-3 9-3 4.5 3 7 3"
        fill="none"
        stroke="var(--color-mar)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Wordmark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark className="size-9" />
      <span className="flex flex-col leading-none">
        <span className={cn("sign text-[1.15rem]", tone === "dark" ? "text-tinta" : "text-cal")}>Matabeira</span>
        <span
          className={cn(
            "sign-narrow mt-1 text-[0.6rem] tracking-[0.32em]",
            tone === "dark" ? "text-tinta-2" : "text-cal/70",
          )}
        >
          Resort
        </span>
      </span>
    </span>
  )
}
