// Factos confirmados pelo resort. Não acrescentar preços, capacidades ou
// promessas sem confirmação do cliente.
export const RESORT = {
  name: "Matabeira",
  full: "Resort Matabeira",
  tagline: "O seu refúgio no Mussulo",
  location: "Mussulo, Luanda",
  phones: ["927 648 082", "942 236 127"],
  whatsapp: "244927648082",
  menuUrl: "https://matabeira-menu.onrender.com",
}

export const whatsappLink = (text: string) =>
  `https://wa.me/${RESORT.whatsapp}?text=${encodeURIComponent(text)}`

export const telLink = (phone: string) => `tel:+244${phone.replace(/\s/g, "")}`

export const STOPS = [
  { id: "praia", label: "Praia" },
  { id: "piscina", label: "Piscina" },
  { id: "restaurante", label: "Restaurante" },
  { id: "cabanas", label: "Cabanas" },
  { id: "eventos", label: "Eventos" },
] as const
