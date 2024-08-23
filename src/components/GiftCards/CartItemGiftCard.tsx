import { GiftCard } from "@/types";
import { toast } from "sonner";
import { FaTrashAlt } from "react-icons/fa";
import { useCartStore } from "@/stores/useCartStore";


interface CartItemGiftCardProps {
  giftCard: GiftCard;
}

export default function CartItemGiftCard({ giftCard }: CartItemGiftCardProps) {

  const removeFromGiftCard = useCartStore((state) => state.removeFromGiftCard);
  return (
    <li className="flex justify-between items-center gap-4 mb-2 shadow-md p-4">
      <div className="flex items-center md:flex-row flex-col md:text-start text-center hover:cursor-pointer">
        <img
          src={giftCard.designCard}
          alt="gift-card"
          width={100}
          height={100}
          className="h-10 w-10 rounded-full md:mr-4"
        />
        <div className="flex flex-col">
          <span className="font-bold flex-1">
            Gift Card 
            <span className="font-light"> x 1</span>
          </span>
          <span className="text-gray-600 font-bold">${Number(giftCard?.amountCard).toFixed(2)}</span>
        </div>
            </div>
          <div className="flex md:flex-col flex-row-reverse md:items-center">
        <button
          title="Remove Item"
          className="text-red-300 hover:text-red-600 hover:md:scale-110 ml-4 pt-3 pb-2"
          onClick={() => (
            removeFromGiftCard(giftCard),
            toast.error(`Producto eliminado 🗑 `)
          )}
        >
          <FaTrashAlt size={18} />
        </button>
      </div>
    </li>
  )
}
