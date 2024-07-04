import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product } from "../types";

interface State {
  cart: Product[];
  totalItems: number;
  totalPrice: number;
  flavorsSelected: boolean;
}

interface Actions {
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  subtractFromCart: (product: Product) => void;
  selectFlavors: (product: Product, flavorsSelected: boolean) => void;
}

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  flavorsSelected: false,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      flavorsSelected: INITIAL_STATE.flavorsSelected,
      addToCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item
          );
          set((state) => {
            const updatedState = {
              ...state,
              cart: updatedCart,
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + parseFloat(product.price), // Convertir a number
            };
            if (product.category && product.category.name === "bombones") {
              const bombonesCount = updatedState.cart.filter(
                (item) => item.category.name === "bombones"
              ).length;
              console.log(
                `Existe ${bombonesCount} productos que son bombones, por favor elegir sabores`
              );
            }
            return updatedState;
          });
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];

          set((state) => {
            const updatedState = {
              ...state,
              cart: updatedCart,
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + parseFloat(product.price), // Convertir a number
              flavorsSelected: false, // Reiniciar selección de sabores para nuevos productos
            };
            if (product.category && product.category.name === "bombones") {
              const bombonesCount = updatedState.cart.filter(
                (item) => item.category.name === "bombones"
              ).length;
              console.log(
                `Agregaste ${bombonesCount} producto que son bombones, por favor elegir sabores`
              );
            }
            return updatedState;
          });
        }
      },
      removeFromCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updatedCart = cart.filter((item) => item.id !== product.id);
          set((state) => ({
            ...state,
            cart: updatedCart,
            totalItems: state.totalItems - (cartItem.quantity as number),
            totalPrice:
              state.totalPrice -
              parseFloat(cartItem.price) * (cartItem.quantity as number), // Convertir a number
          }));
        }
      },
      subtractFromCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          if (cartItem.quantity === 1) {
            const updatedCart = cart.filter((item) => item.id !== product.id);
            set((state) => ({
              ...state,
              cart: updatedCart,
              totalItems: state.totalItems - 1,
              totalPrice: state.totalPrice - parseFloat(product.price), // Convertir a number
            }));
          } else {
            const updatedCart = cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: (item.quantity as number) - 1 }
                : item
            );
            set((state) => ({
              ...state,
              cart: updatedCart,
              totalItems: state.totalItems - 1,
              totalPrice: state.totalPrice - parseFloat(product.price), // Convertir a number
            }));
          }
        }
      },
      selectFlavors: (product: Product, flavorsSelected: boolean) => {
        if (product.category && product.category.name === "bombones") {
          set((state) => ({
            ...state,
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, flavorsSelected } : item
            ),
            flavorsSelected,
          }));
        }
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
