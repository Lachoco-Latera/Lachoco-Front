import { FaTrashAlt } from "react-icons/fa";

import { Product } from "../../types.d";
import { useCartStore } from "../../stores/useCartStore";
import { toast } from "sonner";
interface Props {
  product: Product;
}

export default function CartItem({ product }: Props) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <li className="flex justify-between items-center gap-4  mb-2 shadow-md p-4">
      <div className="flex items-center">
        <img
          src={product.thumbnail}
          alt={product.name}
          width={100}
          height={100}
          className="h-10 w-10 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <span className="font-bold flex-1">{product.name}</span>
          <span className="text-gray-600 font-bold">${product.price}</span>
          <span>Quantity: {product.quantity}</span>
        </div>
      </div>
      <div>
        <button
          title="Remove Item"
          className="text-red-500 hover:text-red-600 ml-4"
          onClick={() => (
            removeFromCart(product),
            toast.error(`Producto ${product.name} eliminado 🗑 `)
          )}
        >
          <FaTrashAlt size={18} />
        </button>
      </div>
    </li>
  );
}
