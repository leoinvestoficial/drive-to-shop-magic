import lemon from "@/assets/brand/can-lemon-real.png";
import orange from "@/assets/brand/can-orange-real.png";
import mixed from "@/assets/brand/can-lemon-real.png";

export type Pack = {
  id: string;
  name: string;
  subtitle: string;
  img: string;
  highlight: boolean;
  freeShip: boolean;
  mdOrder: string;
  price: string;
  description: string;
  details: string[];
};

export const packs: Pack[] = [
  {
    id: "mixed",
    name: "pack misto",
    subtitle: "3 lemon + 3 orange",
    img: mixed,
    highlight: true,
    freeShip: true,
    mdOrder: "md:order-2",
    price: "R$ 50,00",
    description:
      "O equilíbrio perfeito entre os dois sabores da edição 01. Frete grátis incluso para a região atendida.",
    details: [
      "6 latas (3 lemon fresh + 3 orange bliss)",
      "Frete grátis incluso",
      "Edição limitada — enquanto durar o estoque",
    ],
  },
  {
    id: "lemon",
    name: "lemon fresh",
    subtitle: "6 latas · sabor limão",
    img: lemon,
    highlight: false,
    freeShip: false,
    mdOrder: "md:order-1",
    price: "R$ 50,00",
    description:
      "Cítrico, leve e refrescante. Hidratação funcional para o dia inteiro.",
    details: [
      "6 latas — sabor limão",
      "Sem cafeína",
      "Edição limitada",
    ],
  },
  {
    id: "orange",
    name: "orange bliss",
    subtitle: "6 latas · sabor laranja",
    img: orange,
    highlight: false,
    freeShip: false,
    mdOrder: "md:order-3",
    price: "R$ 50,00",
    description:
      "Doçura natural da laranja com a leveza funcional da Flow.",
    details: [
      "6 latas — sabor laranja",
      "Sem cafeína",
      "Edição limitada",
    ],
  },
];

export const getPack = (id?: string) => packs.find((p) => p.id === id);