import { useEffect, useState } from "react"
import { ArrowUpRight, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react"
import { BookingPad } from "@/components/booking-pad"
import { Wordmark } from "@/components/brand"
import { RESORT, STOPS, telLink, whatsappLink } from "@/lib/resort"
import { cn } from "@/lib/utils"

const BOOK_TEXT = "Olá, Resort Matabeira! Gostaria de fazer uma reserva. Têm disponibilidade?"
const EVENT_TEXT = "Olá, Resort Matabeira! Gostaria de falar sobre um casamento ou festa no resort."

function Photo({
  name,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  eager,
}: {
  name: string
  alt: string
  className?: string
  sizes?: string
  eager?: boolean
}) {
  return (
    <img
      src={`/img/${name}-1200.webp`}
      srcSet={`/img/${name}-720.webp 720w, /img/${name}-1200.webp 1200w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      className={cn("block h-full w-full object-cover", className)}
    />
  )
}

/** Observa as fotos a revelar e a paragem actual do passadiço. */
function useWalk() {
  const [stop, setStop] = useState<string | null>(null)

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            reveal.unobserve(e.target)
          }
        }),
      { rootMargin: "0px 0px -12% 0px" },
    )
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el))

    const stops = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setStop(e.target.getAttribute("data-stop"))
        })
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )
    document.querySelectorAll("[data-stop]").forEach((el) => stops.observe(el))
    const hero = document.getElementById("inicio")
    const heroObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.4) setStop(null)
      },
      { threshold: [0.4] },
    )
    if (hero) heroObs.observe(hero)

    return () => {
      reveal.disconnect()
      stops.disconnect()
      heroObs.disconnect()
    }
  }, [])

  return stop
}

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="flex h-[72px] items-center justify-between px-5 sm:px-8 lg:pr-6 lg:pl-24">
        <a href="#inicio" aria-label="Resort Matabeira, início" className="rounded-[2px]">
          <Wordmark />
        </a>
        <nav
          aria-label="Secções"
          className="hidden h-12 items-center gap-6 rounded-[4px] bg-cal/92 pr-1.5 pl-5 shadow-[0_8px_24px_-12px_rgb(27_34_38/0.45)] backdrop-blur-md lg:flex"
        >
          {STOPS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-[0.95rem] font-medium text-tinta-2 transition-colors hover:text-tinta"
            >
              {s.label}
            </a>
          ))}
          <a
            href="#reservar"
            className="sign-narrow inline-flex h-9 items-center rounded-[3px] bg-tinta px-4 text-[0.75rem] text-cal transition-[background-color,transform] duration-150 hover:bg-madeira-escura active:scale-[0.97]"
          >
            Reservar
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="relative grid min-h-[100svh] lg:grid-cols-12">
      <div className="order-2 flex flex-col px-5 pt-8 pb-14 sm:px-8 lg:order-1 lg:col-span-6 lg:pt-[104px] lg:pb-12 lg:pl-24 lg:pr-10 xl:col-span-5 xl:pr-12">
        <h1 className="sign text-[clamp(2.5rem,4.2vw,4.4rem)] text-tinta">
          <span className="layer block" style={{ animationDelay: "80ms" }}>
            O seu refúgio
          </span>
          <span className="layer block text-madeira" style={{ animationDelay: "200ms" }}>
            no Mussulo.
          </span>
        </h1>
        <p
          className="layer mt-5 max-w-[42ch] text-[1.08rem] leading-relaxed text-tinta-2"
          style={{ animationDelay: "320ms" }}
        >
          Cabanas junto à praia, piscina, restaurante e bar. Diga-nos quando vem e quantos são.
        </p>
        <div id="reservar" className="layer mt-7 scroll-mt-24" style={{ animationDelay: "420ms" }}>
          <BookingPad />
        </div>
      </div>

      <div className="relative order-1 h-[58svh] lg:order-2 lg:col-span-6 lg:h-auto xl:col-span-7">
        <Photo
          name="passadico"
          alt="Passadiço de madeira entre as cabanas brancas de telhado vermelho do Resort Matabeira"
          eager
          sizes="(min-width: 1024px) 58vw, 100vw"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cal/90 to-transparent lg:hidden" />
      </div>
    </section>
  )
}

function Praia() {
  return (
    <section id="praia" data-stop="praia" className="scroll-mt-6 px-5 py-24 sm:px-8 lg:py-36 lg:pl-28">
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:pt-24">
          <h2 className="sign text-[clamp(2rem,3.4vw,3.2rem)]">
            A praia começa onde acaba o passadiço.
          </h2>
          <p className="mt-6 max-w-[46ch] text-[1.1rem] leading-relaxed text-tinta-2">
            Palhotas, espreguiçadeiras e a água calma da baía do Mussulo. Os miúdos na areia, os mais
            velhos à sombra, e ninguém com pressa de voltar para Luanda.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
          <div className="reveal row-span-2 aspect-[3/4.6] overflow-hidden rounded-[4px]">
            <Photo name="praia-palhotas" alt="Palhotas e espreguiçadeiras na areia, com o mar ao fundo" sizes="(min-width: 1024px) 28vw, 50vw" />
          </div>
          <div className="reveal mt-16 aspect-[3/4] overflow-hidden rounded-[4px] sm:mt-24">
            <Photo name="lagoa" alt="Água azul e calma da baía, com a margem de areia e vegetação" sizes="(min-width: 1024px) 28vw, 50vw" />
          </div>
          <div className="reveal aspect-[4/3] overflow-hidden rounded-[4px]">
            <Photo name="praia-baloicos" alt="Baloiços de madeira na areia branca, à beira da água" sizes="(min-width: 1024px) 28vw, 50vw" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Piscina() {
  const items = ["Bar", "Música 24 horas", "Salão de jogos", "Sala de fumadores"]
  return (
    <section id="piscina" data-stop="piscina" className="scroll-mt-0 bg-noite text-cal">
      <div className="grid lg:min-h-[100svh] lg:grid-cols-12">
        <div className="reveal relative h-[70svh] overflow-hidden lg:col-span-7 lg:h-auto">
          <Photo name="piscina-noite" alt="A piscina iluminada à noite, com palhotas e espreguiçadeiras à volta" sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>
        <div className="flex flex-col justify-center px-5 py-20 sm:px-8 lg:col-span-5 lg:px-14 lg:py-24">
          <h2 className="sign text-[clamp(2.1rem,4.2vw,3.7rem)] text-cal">
            De noite, a piscina acende-se.
          </h2>
          <p className="mt-6 max-w-[40ch] text-[1.1rem] leading-relaxed text-cal/75">
            Depois da praia, a festa muda-se para a água. E não tem hora para acabar.
          </p>
          <ul className="mt-12 flex flex-col gap-4">
            {items.map((item) => (
              <li key={item} className="sign-narrow text-[clamp(1.15rem,2vw,1.5rem)] text-lagoa">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Restaurante() {
  return (
    <section id="restaurante" data-stop="restaurante" className="scroll-mt-6 px-5 py-24 sm:px-8 lg:py-36 lg:pl-28">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="sign max-w-[16ch] text-[clamp(2.1rem,5vw,4.6rem)]">
          Cozinha cubana, angolana e internacional.
        </h2>
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="reveal aspect-[4/5] overflow-hidden rounded-[4px] lg:col-span-5">
            <Photo name="peixe-grelhado" alt="Peixe grelhado com batata cozida, legumes, ovo e limão" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7 lg:pt-28">
            <div className="reveal aspect-[4/3] overflow-hidden rounded-[4px]">
              <Photo name="pequeno-almoco" alt="Pequeno-almoço com pão, fiambre, salsichas e queijo" sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <div>
              <p className="max-w-[44ch] text-[1.1rem] leading-relaxed text-tinta-2">
                Do pequeno-almoço ao jantar, com o restaurante e o bar ao pé da praia. O menu completo,
                com preços, está sempre à mão no telemóvel.
              </p>
              <a
                href={RESORT.menuUrl}
                target="_blank"
                rel="noreferrer"
                className="sign-narrow group mt-6 inline-flex items-center gap-2 border-b-2 border-telha pb-1 text-[0.95rem] text-tinta transition-colors hover:text-telha"
              >
                Ver o menu do restaurante e bar
                <ArrowUpRight weight="bold" className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cabanas() {
  return (
    <section id="cabanas" data-stop="cabanas" className="scroll-mt-0 relative">
      <div className="reveal relative h-[88svh] overflow-hidden">
        <Photo name="cabanas" alt="Fila de cabanas brancas com telhado de telha vermelha e uma palmeira, vistas do alto das escadas" sizes="100vw" className="object-[50%_40%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-tinta/85 via-tinta/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-14 sm:px-8 lg:pb-20 lg:pl-28">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="sign max-w-[14ch] text-[clamp(2.1rem,5vw,4.6rem)] text-cal">
              Cabanas brancas, telha vermelha.
            </h2>
            <p className="mt-5 max-w-[44ch] text-[1.1rem] leading-relaxed text-cal/85">
              Ligadas por passadiços de madeira, a poucos passos da areia. Para um dia, um fim de semana
              ou mais: pergunte-nos pela disponibilidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Eventos() {
  return (
    <section id="eventos" data-stop="eventos" className="scroll-mt-6 planks-x relative overflow-hidden">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-20 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-28 lg:pl-28">
        <div>
          <h2 className="sign max-w-[18ch] text-[clamp(2rem,4.4vw,3.8rem)] text-cal">
            Casamentos e festas à beira-mar.
          </h2>
          <p className="mt-5 max-w-[44ch] text-[1.1rem] leading-relaxed text-cal/85">
            O Matabeira recebe casamentos e celebrações. Conte-nos a sua ideia e organizamos consigo.
          </p>
        </div>
        <a
          href={whatsappLink(EVENT_TEXT)}
          target="_blank"
          rel="noreferrer"
          className="sign-narrow inline-flex h-14 shrink-0 items-center justify-center gap-2.5 rounded-[4px] bg-cal px-6 text-[0.9rem] text-madeira-escura transition-[background-color,transform] duration-150 ease-out hover:bg-white active:scale-[0.98]"
        >
          <WhatsappLogo weight="fill" className="size-5 text-palma" />
          Falar sobre um evento
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-tinta text-cal">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-28 sm:px-8 lg:pb-16 lg:pl-28">
        <p className="sign text-[clamp(2.6rem,9vw,8.5rem)] leading-[0.85] text-cal/95">Matabeira</p>
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="sign-narrow text-[0.75rem] text-cal/55">Reservas e informações</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {RESORT.phones.map((p) => (
                <li key={p}>
                  <a href={telLink(p)} className="inline-flex items-center gap-2 text-xl font-semibold tabular-nums hover:text-lagoa">
                    <Phone weight="bold" className="size-4 text-cal/60" />
                    {p}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink(BOOK_TEXT)}
              target="_blank"
              rel="noreferrer"
              className="sign-narrow mt-6 inline-flex h-12 items-center gap-2.5 rounded-[4px] bg-telha px-5 text-[0.85rem] text-cal transition-[background-color,transform] duration-150 ease-out hover:bg-telha-escura active:scale-[0.98]"
            >
              <WhatsappLogo weight="fill" className="size-5" />
              Reservar no WhatsApp
            </a>
          </div>
          <div>
            <h3 className="sign-narrow text-[0.75rem] text-cal/55">Onde estamos</h3>
            <p className="mt-4 inline-flex items-center gap-2 text-xl font-semibold">
              <MapPin weight="bold" className="size-4 text-cal/60" />
              {RESORT.location}
            </p>
            <p className="mt-2 max-w-[32ch] text-cal/70">Angola</p>
          </div>
          <div>
            <h3 className="sign-narrow text-[0.75rem] text-cal/55">Restaurante e bar</h3>
            <a
              href={RESORT.menuUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xl font-semibold hover:text-lagoa"
            >
              Menu digital
              <ArrowUpRight weight="bold" className="size-4" />
            </a>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-cal/15 pt-6 text-sm text-cal/55 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {RESORT.full}</p>
          <p>
            Site por{" "}
            <a href="https://expressers.ao" target="_blank" rel="noreferrer" className="underline hover:text-cal">
              Expressers
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

/** O passadiço: a espinha de tábuas que atravessa a página, com a bandeira de "está aqui". */
function Boardwalk({ stop }: { stop: string | null }) {
  const label = STOPS.find((s) => s.id === stop)?.label
  return (
    <div aria-hidden className="pointer-events-none absolute top-0 bottom-0 left-8 z-20 hidden w-[22px] lg:block">
      <div className="planks absolute inset-0 rounded-[2px] shadow-[2px_0_8px_rgb(0_0_0/0.18)]" />
      <div className="sticky top-1/2 h-0">
        <div
          className={cn(
            "absolute left-[30px] -translate-y-1/2 transition-[opacity,transform] duration-500 ease-out",
            label ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
          )}
        >
          <span className="sign-narrow relative block whitespace-nowrap rounded-r-[3px] bg-telha py-1.5 pr-3 pl-2.5 text-[0.68rem] text-cal shadow-[0_6px_14px_-6px_rgb(0_0_0/0.5)] before:absolute before:top-0 before:-left-[10px] before:h-full before:w-[10px] before:bg-telha-escura before:[clip-path:polygon(100%_0,0_50%,100%_100%)]">
            {label ?? ""}
          </span>
        </div>
      </div>
    </div>
  )
}

/** Barra fixa no telemóvel: onde está e o botão de reservar. */
function MobileBar({ stop }: { stop: string | null }) {
  const label = STOPS.find((s) => s.id === stop)?.label
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-tinta/10 bg-cal/95 backdrop-blur-md transition-transform duration-300 ease-out lg:hidden",
        stop ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <span className="sign-narrow flex min-w-0 items-center gap-2 truncate text-[0.7rem] text-tinta-2">
          <span className="planks-x inline-block h-3 w-5 rounded-[2px]" aria-hidden />
          {label}
        </span>
        <a
          href={whatsappLink(BOOK_TEXT)}
          target="_blank"
          rel="noreferrer"
          className="sign-narrow inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-[4px] bg-telha px-3.5 text-[0.72rem] text-cal active:scale-[0.97]"
        >
          <WhatsappLogo weight="fill" className="size-4" />
          Reservar no WhatsApp
        </a>
      </div>
    </div>
  )
}

export default function App() {
  const stop = useWalk()
  return (
    <>
      <a
        href="#reservar"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-tinta focus:px-4 focus:py-2 focus:text-cal"
      >
        Ir para a reserva
      </a>
      <Header />
      <main className="relative">
        <Boardwalk stop={stop} />
        <Hero />
        <Praia />
        <Piscina />
        <Restaurante />
        <Cabanas />
        <Eventos />
      </main>
      <Footer />
      <MobileBar stop={stop} />
    </>
  )
}
