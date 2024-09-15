import { FaCheck, FaExclamation, FaTrashAlt } from "react-icons/fa";
import { Product } from "../../types";
import { useCartStore } from "../../stores/useCartStore";
import { toast } from "sonner";
import { IoIosAdd } from "react-icons/io";
import { LuMinus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  product: Product;
  onUpdateFlavors: () => void; // Función para notificar al Cart sobre cambios en sabores
}

export default function CartItem({ product, onUpdateFlavors }: Props) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const delFromCart = useCartStore((state) => state.subtractFromCart);
  const cart = useCartStore((state) => state.cart);
  const confirmedFlavors = useCartStore((state) => state.confirmedFlavors); // Obtener confirmedFlavors del store
  const [confirmedFlavorsCount, setConfirmedFlavorsCount] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState<boolean>(false); // Estado para controlar la visibilidad del tooltip
  const navigate = useNavigate();
  const {t} =useTranslation()
  
  const handleNavigate = (productId: any) => {
    navigate(`/products/${productId}`);
  };
  const selectedProductId = product.id;

  useEffect(() => {
    // Calcular la cantidad de veces que selectedProductId aparece en confirmedFlavors
    let count = 0;
    if (confirmedFlavors[selectedProductId]) {
      count = confirmedFlavors[selectedProductId].length;
    }
    setConfirmedFlavorsCount(count);
  }, [confirmedFlavors, selectedProductId]);

  const productMaxFlavor = product.quantity * product.presentacion;

  const handleSubtractFromCart = (product: Product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem?.quantity === 1) {
      removeFromCart(product);
      toast.error(`${t("Toast_product")} ${product.name} ${t("Toast_delet")}`);
    } else {
      delFromCart(product);
      toast.info(`${t("Toast_product")} ${product.name} ${t("withdrawn")}`);
    }
  };

  useEffect(() => {
    onUpdateFlavors(); // Notificar al padre cada vez que se actualicen los sabores
  }, [confirmedFlavorsCount, onUpdateFlavors]);

  return (
    <li className="flex justify-between items-center gap-4 mb-2 shadow-md p-4">
      <div
        className="flex items-center md:flex-row flex-col md:text-start text-center hover:cursor-pointer"
        onClick={() => handleNavigate(product.id)}
      >
        <img
          src={product.images[0]?.img}
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
          <span className="flex flex-row gap-2 items-center relative">
            Cajas: {product.quantity}
            {confirmedFlavorsCount !== productMaxFlavor &&
            product.category.name === "bombones" ? (
              <>
                <FaExclamation
                  className="text-amber-500 cursor-pointer"
                  size={16}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                />
                {showTooltip && (
                  <span className="tooltip absolute bg-slate-600 opacity-95 text-white text-xs px-2 py-1 rounded-md -left-2 -top-10">
                    - {t("Cart_load")}
                  </span>
                )}
              </>
            ) : (
              <FaCheck className="text-green-500" />
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
            toast(t("Toast_add"), {
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
            toast.error(`${t("Toast_product")} ${product.name} ${t("Toast_delet")}`)
          )}
        >
          <FaTrashAlt size={18} />
        </button>
        <button
          title="Subtract Item"
          className="text-gray-500 pt-1 md:pt-1 hover:text-gray-600 ml-4 hover:md:scale-110"
          onClick={() => handleSubtractFromCart(product)}
        >
          <LuMinus size={22} />
        </button>
      </div>
    </li>
  );
}
