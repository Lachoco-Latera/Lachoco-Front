import { FaTrashAlt } from "react-icons/fa";

import { Product } from "../../types";
import { useCartStore } from "../../stores/useCartStore";
import { toast } from "sonner";
interface Props {
  product: Product;
}

export default function CartItem({ product }: Props) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const delFromCart = useCartStore((state) => state.substractFromCart);
  const cart = useCartStore((state) => state.cart);

  const handleSubtractFromCart = (product: Product) => {
    const cartItem = cart.find((item) => item.id === product.id);

    if (
      //@ts-ignore
      cartItem?.quantity === 1
    ) {
      removeFromCart(product);
      toast.error(`Producto ${product.name} fue eliminado 🗑`);
    } else {
      delFromCart(product);
      toast.info(`Producto ${product.name} retirado`);
    }
  };
  return (
    <li className="flex justify-between items-center gap-4 mb-2 shadow-md p-4">
      <div className="flex items-center">
        <img
          src={product.images[1]?.img}
          alt={product.name}
          width={100}
          height={100}
          className="h-10 w-10 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <span className="font-bold flex-1">{product.name}</span>
          <span className="text-gray-600 font-bold">${product.price}</span>

          <span>
            Quantity:
            {
              //@ts-ignore
              product.quantity
            }
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <button
          title="Add Item"
          className="text-gray-500 hover:text-gray-600 ml-4"
          onClick={() => (
            addToCart(product),
            toast("✔ Añadido al carrito", {
              action: {
                label: "Carrito",
                onClick: () => console.log(`Producto ${product} añadido`),
              },
            })
          )}
        >
          ^
        </button>
        <button
          title="Remove Item"
          className="text-red-300 hover:text-red-600 hover:scale-110 ml-4"
          onClick={() => (
            removeFromCart(product),
            toast.error(`Producto ${product.name} eliminado 🗑 `)
          )}
        >
          <FaTrashAlt size={18} />
        </button>
        <button
          title="Substract Item"
          className="text-gray-500 hover:text-gray-600 ml-4"
          onClick={() => handleSubtractFromCart(product)}
        >
          v
        </button>
      </div>
    </li>
  );
}
