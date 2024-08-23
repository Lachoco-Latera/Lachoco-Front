import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GiftCard, Product } from "../types";

interface State {
  cart: Product[];
  giftCards: GiftCard[];
  totalItems: number;
  totalPrice: number;
  confirmedFlavors: { [productId: string]: string[] };
}

interface Actions {
  addToCart: (product: Product) => void;
  addGiftCard: (giftCard: GiftCard) => void;
  removeFromGiftCard: (giftCard: GiftCard) => void;
  removeFromCart: (product: Product) => void;
  subtractFromCart: (product: Product) => void;
  selectFlavors: (productId: string, pickedFlavors: string[]) => void;
  addConfirmedFlavors: (productId: string, confirmedFlavors: string[]) => void;
  removeConfirmedFlavors: (productId: string) => void;
  clearCart: () => void;
}

const INITIAL_STATE: State = {
  cart: [],
  giftCards: [],
  totalItems: 0,
  totalPrice: 0,
  confirmedFlavors: {},
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      giftCards: INITIAL_STATE.giftCards,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      confirmedFlavors: INITIAL_STATE.confirmedFlavors,
      addToCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item
          );
          set((state) => ({
            ...state,
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + parseFloat(product.price),
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];

          set((state) => ({
            ...state,
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + parseFloat(product.price),
          }));
        }
      },
      addGiftCard: (giftCard: GiftCard) => {
        set((state) => ({
          ...state,
          giftCards: [...state.giftCards, giftCard],
          totalPrice: state.totalPrice + parseFloat(giftCard.amountCard),
        }))
        

      },
      removeFromGiftCard: (giftCard: GiftCard) => {
        const giftCards = get().giftCards;
        const giftCardIndex = giftCards.find((item) => item.emailRecipient === giftCard.emailRecipient);

        if (giftCardIndex) {
          const updatedGiftCards = giftCards.filter((item) => item.emailRecipient !== giftCard.emailRecipient);
          set((state) => ({
            ...state,
            giftCards: updatedGiftCards,
            totalPrice: state.totalPrice - parseFloat(giftCard.amountCard),
          }));
        }
      },
      removeFromCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updatedCart = cart.filter((item) => item.id !== product.id);
          const confirmedFlavors = { ...get().confirmedFlavors };
          delete confirmedFlavors[product.id]; // Eliminar los sabores confirmados del producto eliminado

          set((state) => ({
            ...state,
            cart: updatedCart,
            totalItems: state.totalItems - (cartItem.quantity as number),
            totalPrice:
              state.totalPrice -
              parseFloat(cartItem.price) * (cartItem.quantity as number),
            confirmedFlavors,
          }));
        }
      },
      subtractFromCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          if (cartItem.quantity === 1) {
            const updatedCart = cart.filter((item) => item.id !== product.id);
            const confirmedFlavors = { ...get().confirmedFlavors };
            delete confirmedFlavors[product.id]; // Eliminar los sabores confirmados del producto eliminado

            set((state) => ({
              ...state,
              cart: updatedCart,
              totalItems: state.totalItems - 1,
              totalPrice: state.totalPrice - parseFloat(product.price),
              confirmedFlavors,
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
              totalPrice: state.totalPrice - parseFloat(product.price),
            }));
          }
        }
      },
      selectFlavors: (productId: string, pickedFlavors: string[]) => {
        set((state) => ({
          ...state,
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, pickedFlavors } : item
          ),
        }));
      },
      addConfirmedFlavors: (
        productId: string,
        confirmedFlavorsToAdd: string[]
      ) => {
        set((state) => ({
          ...state,
          confirmedFlavors: {
            ...state.confirmedFlavors,
            [productId]: [
              ...(state.confirmedFlavors[productId] || []),
              ...confirmedFlavorsToAdd,
            ],
          },
        }));
      },
      removeConfirmedFlavors: (productId: string) => {
        const confirmedFlavors = { ...get().confirmedFlavors };
        delete confirmedFlavors[productId]; // Eliminar los sabores confirmados del producto eliminado

        set((state) => ({
          ...state,
          confirmedFlavors,
        }));
      },
      clearCart: () => {
        set({
          cart: [],
          totalItems: 0,
          totalPrice: 0,
          confirmedFlavors: {},
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
