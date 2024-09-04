import { VITE_BASE_URL } from "@/config/envs";
import { GiftCard } from "@/types";
import axios from "axios";

export const createGiftCard = async (giftCard: Omit<GiftCard, 'id'> & { userId: string }) => {
  const newGiftCard = { ...giftCard, userId: giftCard.userId, img: giftCard.designCard , discount: +giftCard.amountCard }
  const response = await axios.post(`${VITE_BASE_URL}/gitfcards`, newGiftCard)
  return response
}