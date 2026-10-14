# Design: Resort Matabeira, "O passadiço"

The site is the wooden boardwalk between the white chalets. You walk it top to bottom; each section is a stop (praia, piscina, restaurante, cabanas, eventos). Tokens live in `src/index.css` (`@theme`).

## Colour (Full palette, light; the visitor reads it on a phone in daylight)

| Role | Token | Hex | Use |
|---|---|---|---|
| Ground | `cal` | #f2f3ef | Lime-wash white: page ground |
| Ground 2 | `cal-2` | #e7e9e3 | Message preview, quiet fills |
| Structure | `madeira` | #7a5638 | Boardwalk planks, second headline line |
| Structure dark | `madeira-escura` | #4a321f | Selected segment, hovers |
| Action | `telha` | #b9472a | Roof-tile red. The ONLY action colour: WhatsApp booking, "you are here" flag |
| Action hover | `telha-escura` | #963619 | |
| Water | `lagoa` | #1f97ad | Lists on night, logo wave |
| Deep water | `mar` | #0d4c5e | Logo wave |
| Night | `noite` | #0b1c27 | Pool section ground |
| Palm | `palma` | #2f6a42 | Selected interest chips |
| Ink | `tinta` / `tinta-2` | #1b2226 / #4a5459 | Text, footer ground |

Rules: body text stays achromatic on cal; colour lives in wood, roof and water. Telha is never decorative.

## Type

- Display: Archivo Variable at `wdth 125`, weight 800, uppercase, line-height 0.92 (`.sign`). Reads like a painted resort sign.
- Labels and buttons: Archivo `wdth 112`, 700, uppercase, +0.02em (`.sign-narrow`).
- Body: Figtree Variable, 1.08 to 1.12rem, max 46ch.
- No eyebrows above headings. No em dashes.

## Material and shape

- `.planks` (vertical rail) and `.planks-x` (deck band) are the boardwalk. No cards, no boxes: content sits on cal, on planks or on photos.
- One radius: 4px everywhere (photos, buttons, inputs, chips); 2-3px for tiny inner marks.
- Shadows are offset and tinted (telha or tinta), never zero-offset halos.

## Components

- Booking pad (`src/components/booking-pad.tsx`): stay segment, people stepper, optional date, interest chips with a tick mark (state is a mark, not only a hue), live message preview, "Reservar no WhatsApp". Opens wa.me with the composed message.
- Boardwalk rail (desktop): plank strip down the left of `main`, with a sticky telha flag naming the current stop.
- Mobile bar: fixed bottom bar after the hero with the current stop and the booking button.
- One label per intent: "Reservar no WhatsApp" (booking), "Falar sobre um evento" (events), "Ver o menu..." (menu).

## Motion

Ease `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`. Hero lines register in order (opacity, 14px rise, 6px blur, 800ms, staggered). Photos reveal with `clip-path: inset(18% 0 0 0)` to full on entering view. Buttons press to `scale(0.97-0.98)`. Everything is visible without JS and under `prefers-reduced-motion`.

## Imagery

Only the client's real photos (`public/img`, WebP 720/1200, origin embedded). The logo concept the client shared is a watermarked mockup and is not used; the mark in `brand.tsx` is a simple sun-over-waves drawn for the site until a real logo exists.
