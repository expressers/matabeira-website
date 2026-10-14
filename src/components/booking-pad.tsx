import { useId, useMemo, useState } from "react"
import { Check, Minus, Plus, WhatsappLogo } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { whatsappLink } from "@/lib/resort"
import { cn } from "@/lib/utils"

const STAYS = [
  { id: "dia", label: "Um dia", phrase: "um dia" },
  { id: "fds", label: "Fim de semana", phrase: "um fim de semana" },
  { id: "mais", label: "Mais dias", phrase: "uns dias" },
] as const

const INTERESTS = ["Praia", "Piscina", "Restaurante", "Bar e música"] as const

type Stay = (typeof STAYS)[number]["id"]

const listPt = (items: string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-")
  return `${d}/${m}/${y}`
}

export function BookingPad({ className }: { className?: string }) {
  const uid = useId()
  const [stay, setStay] = useState<Stay>("fds")
  const [people, setPeople] = useState(4)
  const [date, setDate] = useState("")
  const [interests, setInterests] = useState<string[]>(["Praia", "Piscina"])

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const message = useMemo(() => {
    const phrase = STAYS.find((s) => s.id === stay)!.phrase
    const who = `${people} ${people === 1 ? "pessoa" : "pessoas"}`
    const when = date ? `, a partir de ${formatDate(date)}` : ""
    const what = interests.length
      ? ` Interessa-nos: ${listPt(interests.map((i) => i.toLowerCase()))}.`
      : ""
    return `Olá, Resort Matabeira! Gostaria de reservar ${phrase} para ${who}${when}.${what} Têm disponibilidade?`
  }, [stay, people, date, interests])

  const toggle = (item: string) =>
    setInterests((cur) => (cur.includes(item) ? cur.filter((i) => i !== item) : [...cur, item]))

  const labelCls = "sign-narrow text-[0.72rem] text-tinta-2"

  return (
    <form
      className={cn("flex flex-col gap-4", className)}
      onSubmit={(e) => {
        e.preventDefault()
        window.open(whatsappLink(message), "_blank", "noopener")
      }}
      aria-label="Pedido de reserva pelo WhatsApp"
    >
      <fieldset className="flex flex-col gap-2">
        <legend className={cn(labelCls, "mb-1.5")}>Quanto tempo?</legend>
        <div className="grid grid-cols-3 gap-1.5" role="radiogroup">
          {STAYS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={stay === s.id}
              onClick={() => setStay(s.id)}
              className={cn(
                "h-11 whitespace-nowrap rounded-[4px] border px-1 text-[0.86rem] font-semibold sm:text-[0.92rem] transition-[background-color,color,border-color,transform] duration-150 ease-out active:scale-[0.97]",
                stay === s.id
                  ? "border-madeira-escura bg-madeira-escura text-cal"
                  : "border-tinta/15 bg-white/60 text-tinta hover:border-madeira/60",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-[auto_1fr] gap-4">
        <div className="flex flex-col gap-2">
          <span className={labelCls} id={`${uid}-people`}>
            Pessoas
          </span>
          <div className="flex h-11 items-center rounded-[4px] border border-tinta/15 bg-white/60" role="group" aria-labelledby={`${uid}-people`}>
            <button
              type="button"
              className="grid size-11 place-items-center text-tinta transition-transform duration-100 active:scale-90 disabled:opacity-30"
              onClick={() => setPeople((p) => Math.max(1, p - 1))}
              disabled={people <= 1}
              aria-label="Menos uma pessoa"
            >
              <Minus weight="bold" className="size-4" />
            </button>
            <output className="w-8 text-center text-lg font-bold tabular-nums" aria-live="polite">
              {people}
            </output>
            <button
              type="button"
              className="grid size-11 place-items-center text-tinta transition-transform duration-100 active:scale-90 disabled:opacity-30"
              onClick={() => setPeople((p) => Math.min(60, p + 1))}
              disabled={people >= 60}
              aria-label="Mais uma pessoa"
            >
              <Plus weight="bold" className="size-4" />
            </button>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={`${uid}-date`} className={labelCls}>
            Chegada <span className="normal-case tracking-normal opacity-70">(opcional)</span>
          </label>
          <input
            id={`${uid}-date`}
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-11 w-full min-w-0 rounded-[4px] border border-tinta/15 bg-white/60 px-3 text-[0.95rem] text-tinta outline-none transition-colors focus-visible:border-telha"
          />
        </div>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className={cn(labelCls, "mb-1.5")}>O que querem aproveitar?</legend>
        <div className="flex flex-wrap gap-1.5">
          {INTERESTS.map((item) => {
            const on = interests.includes(item)
            return (
              <button
                key={item}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(item)}
                className={cn(
                  "inline-flex h-10 items-center gap-1.5 rounded-[4px] border px-3 text-[0.92rem] font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97]",
                  on
                    ? "border-palma bg-palma/10 text-palma"
                    : "border-tinta/15 bg-white/60 text-tinta-2 hover:border-palma/50",
                )}
              >
                <span
                  className={cn(
                    "grid size-4 place-items-center rounded-[3px] border transition-colors",
                    on ? "border-palma bg-palma text-cal" : "border-tinta/30",
                  )}
                  aria-hidden
                >
                  {on && <Check weight="bold" className="size-3" />}
                </span>
                {item}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <span className={labelCls}>A sua mensagem</span>
        <p className="relative rounded-[4px] rounded-bl-none bg-cal-2 px-4 py-2.5 text-[0.9rem] leading-relaxed text-tinta" aria-live="polite">
          {message}
        </p>
      </div>

      <Button
        type="submit"
        className="sign-narrow h-14 w-full gap-2.5 rounded-[4px] bg-telha text-[0.95rem] text-cal shadow-[0_8px_20px_-10px_rgb(150_54_25/0.7)] transition-[background-color,transform] duration-150 ease-out hover:bg-telha-escura active:scale-[0.98]"
      >
        <WhatsappLogo weight="fill" className="size-5" />
        Reservar no WhatsApp
      </Button>
    </form>
  )
}
