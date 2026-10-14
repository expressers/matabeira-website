# Website: Resort Matabeira

Site do Resort Matabeira (Mussulo, Luanda). Projecto Expressers. Por agora: home page.

- Stack: React + TypeScript + Vite, Bun, Tailwind CSS v4, shadcn/ui (personalizado), Phosphor Icons.
- Deploy: Render, site estático (`render.yaml`), deploy automático a partir de `main`.
- Menu digital: https://matabeira-menu.onrender.com (repo `expressers/matabeira-menu`).

## Desenvolvimento

```bash
bun install
bun run dev
bun run build
```

## Onde mexer

- Contactos, WhatsApp e link do menu: `src/lib/resort.ts`
- Caixa de reserva (mensagem do WhatsApp): `src/components/booking-pad.tsx`
- Secções da home: `src/App.tsx`
- Fotos: `public/img` (WebP 720 e 1200 px)
- Sistema visual: `DESIGN.md`; contexto do produto: `PRODUCT.md`

Não inventar preços, capacidades nem promessas: só o que o resort confirmou.
