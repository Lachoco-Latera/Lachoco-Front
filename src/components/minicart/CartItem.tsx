import { FaCheck, FaExclamation, FaTrashAlt } from "react-icons/fa";
import { Product } from "../../types";
import { useCartStore } from "../../stores/useCartStore";
import { toast } from "sonner";
import { IoIosAdd } from "react-icons/io";
import { LuMinus } from "react-icons/lu";
import { useEffect, useState } from "react";

interface Props {
  product: Product;
}

export default function CartItem({ product }: Props) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const delFromCart = useCartStore((state) => state.subtractFromCart);
  const cart = useCartStore((state) => state.cart);
  const confirmedFlavors = useCartStore((state) => state.confirmedFlavors); // Obtener confirmedFlavors del store
  const [confirmedFlavorsCount, setConfirmedFlavorsCount] = useState<number>(0);
  const [, setActualTotalFlavors] = useState<number>(0);

  const selectedProductId = product.id;

  useEffect(() => {
    // Calcular la cantidad de veces que selectedProductId aparece en confirmedFlavors
    let count = 0;
    if (confirmedFlavors[selectedProductId]) {
      count = confirmedFlavors[selectedProductId].length;
    }
    setConfirmedFlavorsCount(count);

    // Sumar todos los valores de los arrays en confirmedFlavors
    let totalFlavors = 0;
    for (const productId in confirmedFlavors) {
      totalFlavors += confirmedFlavors[productId].length;
    }
    setActualTotalFlavors(totalFlavors);
  }, [confirmedFlavors, selectedProductId]);
  //@ts-ignore
  const productMaxFlavor = product.quantity * product.presentacion;
  // console.log(
  //   "Confirmación individual del cliente",
  //   confirmedFlavorsCount,
  //   "Sumatoria:",
  //   actualTotalFlavors
  // );
  // console.log(
  //   "Confirmación individual del cliente",
  //   confirmedFlavorsCount,
  //   "Máximo:",
  //   productMaxFlavor
  // );
  const handleSubtractFromCart = (product: Product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem?.quantity === 1) {
      removeFromCart(product);
      toast.error(`Producto ${product.name} fue eliminado 🗑`);
    } else {
      delFromCart(product);
      toast.info(`Producto ${product.name} retirado`);
    }
  };

  return (
    <li className="flex justify-between items-center gap-4 mb-2 shadow-md p-4">
      <div
        className="flex items-center md:flex-row flex-col md:text-start text-center hover:cursor-pointer"
        onClick={() => (window.location.href = `/products/${product.id}`)}
      >
        <img
          src={product.images[1]?.img}
          alt={product.name}
          width={100}
          height={100}
          className="h-10 w-10 rounded-full md:mr-4"
        />
        <div className="flex flex-col">
          <span className="font-bold flex-1">
            {product.name}
            <span className="font-light"> x {product.presentacion}</span>
          </span>
          <span className="text-gray-600 font-bold">${product.price}</span>
          <span className="flex flex-row gap-2 items-center">
            Cajas:
            {confirmedFlavorsCount !== productMaxFlavor ? (
              <FaExclamation className=" text-amber-500" size={16} />
            ) : (
              <FaCheck className=" text-green-500" />
            )}
          </span>
        </div>
      </div>
      <div className="flex md:flex-col flex-row-reverse md:items-center">
        <button
          title="Add Item"
          className="text-gray-500 hover:text-gray-600 ml-4 hover:md:scale-110 md:scale-110 scale-150"
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
          <IoIosAdd size={22} />
        </button>
        <button
          title="Remove Item"
          className="text-red-300 hover:text-red-600 hover:md:scale-110 ml-4 pt-3 pb-2"
          onClick={() => (
            removeFromCart(product),
            toast.error(`Producto ${product.name} eliminado 🗑 `)
          )}
        >
          <FaTrashAlt size={18} />
        </button>
        <button
          title="Substract Item"
          className="text-gray-500 pt-1 md:pt-1 hover:text-gray-600 ml-4 hover:md:scale-110"
          onClick={() => handleSubtractFromCart(product)}
        >
          <LuMinus size={22} />
        </button>
      </div>
    </li>
  );
}
