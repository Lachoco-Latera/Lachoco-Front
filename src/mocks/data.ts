import { Product } from "../types";

export const products: Product[] = [
  {
    id: "123831c5-b4d5-4ac6-9ccf-26e485c97d10",
    name: "",
    presentacion: 24,
    category: {
      id: "",
      name: "",
      icon: 2,
    },
    description:
      "Chocolate oscuro premium con 70% de cacao, elaborado con ingredientes de alta calidad y un toque de vainilla.",
    price: "15000.00",
    currency: "COP",
    label: "SoloOnline",
    isActive: true,
    flavors: [
      {
        id: "fde11c41-7476-49e6-b8ae-1b43bbd875af",
        name: "Vanilla",
        stock: 0,
      },
    ],
    images: [
      {
        id: "12faae98-c3be-4153-9331-61814fa94e75",
        img: "https://example.com/images/chocolate_oscuro_2.jpg",
      },
      {
        id: "371a7657-dff6-4ab3-89f7-0efb51cddf24",
        https: "https://example.com/images/chocolate_oscuro_1.jpg",
      },
    ],
  },
] as const;
