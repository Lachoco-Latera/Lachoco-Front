// FlavorModal.tsx
import React from "react";
import { useCartStore } from "../stores/useCartStore";
import { FaCirclePlus } from "react-icons/fa6";
import { toast } from "sonner";

interface Flavor {
  id: string;
  name: string;
  stock: number;
}

interface Image {
  id: string;
  img: string;
}

interface Product {
  id: string;
  name: string;
  presentacion: number;
  description: string;
  price: string;
  currency: string;
  label: string;
  isActive: boolean;
  purchaseDate: string | null;
  expiryDate: string | null;
  status: string;
  flavors: Flavor[];
  images: Image[];
  category?: {
    id?: string;
    icon: string;
    name: string;
  };
}
const FlavorModal: React.FC<{ product: Product; closeModal: any }> = ({
  product,
}) => {
  const { cart, totalItems } = useCartStore();

  let total = 0;
  if (cart) {
    total = cart.reduce((acc, product) => {
      const quantity = Math.max(product.quantity as number, 0);
      const price = parseFloat(product.price);
      return acc + price * quantity;
    }, 0);
  }
  const promise = () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve((window.location.href = "https://www.mercadopago.com.ar")),
        1100
      )
    );
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5  text-center">
        <h2 className="text-4xl font-bold mb-4 drop-shadow-xl">
          {product.name}
        </h2>
        <p className="text-lg mb-2">{product.description}</p>
        <div className="flex justify-between items-start p-6">
          <div className="pr-6">
            <h2 className="text-2xl font-bold mb-4">Select Your Flavors</h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {product.flavors.map((flavor) => (
                <div
                  key={flavor.id}
                  className="flex flex-row items-center gap-2 py-2 px-4 rounded-2xl hover:shadow-lg hover:cursor-pointer hover:scale-105 transition-all ease-out"
                  onClick={() =>
                    toast(`Sabor ${flavor.name} agregado!`, {
                      action: {
                        label: "Okay!",
                        onClick: () =>
                          console.log(`Cerrar toaster de ${flavor.name} `),
                      },
                    })
                  }
                >
                  <div className="flex flex-col justify-center items-center gap-2">
                    <img
                      src={product.images[0]?.img}
                      alt={flavor.name}
                      className="w-16 h-16 rounded"
                    />
                    <div>
                      <p className="text-lg font-semibold">{flavor.name}</p>
                      <p className="text-sm text-gray-600">
                        Stock: {flavor.stock}
                      </p>
                    </div>
                    <div>
                      <FaCirclePlus color={"green"} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 pl-6 border-l border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            <div>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between my-2">
                    <span>{item.name}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: ${item.price}</span>
                  </div>
                ))
              ) : (
                <p className="my-4">Your cart is empty</p>
              )}
            </div>
            <div className="mt-6">
              <p className="text-lg">Total Items: {totalItems}</p>
              <p className="text-lg">Total Price: ${total.toFixed(2)}</p>
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
                Comprár ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorModal;
