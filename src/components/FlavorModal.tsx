import React from "react";
import { useCartStore } from "../stores/useCartStore";
import { FaCirclePlus } from "react-icons/fa6";
import { toast } from "sonner";
import { Product } from "@/types.d";
import { IoMdExit } from "react-icons/io";

interface Props {
  product: Product;
  closeModal: () => void;
}

const FlavorModal: React.FC<Props> = ({ product, closeModal }) => {
  const { cart, totalItems } = useCartStore();

  let total = 0;
  if (cart) {
    total = cart.reduce((acc, product) => {
      const quantity = Math.max(product.quantity as number, 0);
      const price = parseFloat(product.price);
      return acc + price * quantity;
    }, 0);
  }

  const handleFlavorClick = (flavor: any) => {
    toast(`Sabor ${flavor.name} agregado!`, {
      action: {
        label: "Okay!",
        onClick: () => {
          console.log(`Cerrar modal de ${flavor.name}`);
          closeModal(); // Llamamos a la función closeModal para cerrar el modal
        },
      },
    });
  };

  const promise = () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve((window.location.href = "https://www.mercadopago.com.ar")),
        1100
      )
    );

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="flex flex-col bg-white p-6 rounded-2xl shadow-lg w-4/5 text-center z-40"
        onClick={handleModalClick}
      >
        <div className="flex self-end">
          <IoMdExit
            className="cursor-pointer hover:scale-110 text-red-500 hover:text-red-600 transition-all ease duration-200 "
            onClick={closeModal}
            size={28}
          />
        </div>
        <div className="flex flex-row justify-center pb-4">
          <h2 className="text-4xl font-bold mb-4 drop-shadow-xl flex justify-between items-center">
            {product.name}
          </h2>
        </div>
        <p className="text-lg mb-2">{product.description}</p>
        <div className="flex justify-between items-start p-6">
          <div className="pr-6">
            <h2 className="text-2xl font-bold mb-4">Elige tus sabores</h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {product.flavors.map((flavor) => (
                <div
                  key={flavor.id}
                  className="flex flex-row items-center gap-2 py-2 px-4 rounded-2xl hover:shadow-lg hover:cursor-pointer hover:scale-105 transition-all ease-out"
                  onClick={() => handleFlavorClick(flavor)}
                >
                  <div className="flex flex-col justify-center items-center gap-2">
                    <img
                      src={product.images[0]?.img}
                      alt={flavor.name}
                      className="w-16 h-16 rounded"
                    />
                    <div>
                      <p className="text-lg font-semibold">{flavor.name}</p>
                      {/* <p className="text-sm text-gray-600">
                        Stock: {flavor.stock}
                      </p> */}
                    </div>
                    <div className="transform hover:scale-110 transition-transform">
                      <FaCirclePlus color={"green"} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 pl-6 border-l border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Tus sabores elegidos</h2>
            <div>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between my-2">
                    <span>{item.name}</span>
                    <span>Cantidad: {item.quantity}</span>
                    {/* <span>Precio: ${item.price}</span> */}
                  </div>
                ))
              ) : (
                <p className="my-4">Tu carrito está vacio</p>
              )}
            </div>
            <div className="mt-6">
              <p className="text-lg">Total de sabores: {totalItems}</p>
              <p className="text-lg">Precio total: ${total.toFixed(2)}</p>
            </div>
            <div className="pt-4">
              <button
                className="
              bg-rose-600 hover:bg-white
              hover:text-green-300 text-white 
                cursor-pointer transition-all ease 
                hover:scale-105 hover:font-bold text-xl
                shadow rounded-full p-4 hover:drop-shadow-xl "
                onClick={() =>
                  toast.promise(promise, {
                    loading: `Serás redireccionado para pagar ${product.name}...`,
                    success: () => {
                      return `Muchas gracias de antemano! ❤`;
                    },
                    error: "Error",
                  })
                }
              >
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorModal;
