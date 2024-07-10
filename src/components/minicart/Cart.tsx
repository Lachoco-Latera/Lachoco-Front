import CartItem from "./CartItem";
import { useCartStore } from "../../stores/useCartStore";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";

function Cart({ similar }: any) {
  const { cart, confirmedFlavors } = useCartStore();
  const [, setActualConfirmedFlavorsTotal] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState<boolean>(false); // Estado para controlar la visibilidad del tooltip
  const [completed, setCompleted] = useState<boolean>(true);

  similar;
  useEffect(() => {
    const countFlavorsAndSum = () => {
      let totalFlavors = 0;

      for (const id in confirmedFlavors) {
        totalFlavors += confirmedFlavors[id].length;
      }

      setActualConfirmedFlavorsTotal(totalFlavors);
    };

    countFlavorsAndSum();
  }, [confirmedFlavors]);

  let total = 0;
  if (cart) {
    total = cart.reduce((acc, product: any) => {
      const quantity = Math.max(product.quantity as number, 0);
      return acc + product.price * quantity;
    }, 0);
  }

  const bombonesProducts = cart.filter(
    (product) => product.category.name === "bombones"
  );

  // const totalPresentationQuantity = bombonesProducts.reduce(
  //   (total, product: any) => {
  //     return total + product.presentacion * product.quantity;
  //   },
  //   0
  // );

  const handleUpdateFlavors = () => {
    // Función para verificar si todos los sabores están seleccionados
    const hasIncompleteFlavors = bombonesProducts.some((product) => {
      const productMaxFlavor = product.quantity * product.presentacion;
      const confirmedFlavorsCount = confirmedFlavors[product.id]?.length || 0;
      return confirmedFlavorsCount !== productMaxFlavor;
    });
    return !hasIncompleteFlavors;
  };

  useEffect(() => {
    const hasIncompleteFlavors = bombonesProducts.some((product) => {
      const productMaxFlavor = product.quantity * product.presentacion;
      const confirmedFlavorsCount = confirmedFlavors[product.id]?.length || 0;
      return confirmedFlavorsCount !== productMaxFlavor;
    });

    setCompleted(!hasIncompleteFlavors);
  }, [confirmedFlavors, bombonesProducts]);
  const promise = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const order = {
          userId: "27b817f0-3043-48a5-8ad4-d4e173f07765",
          products: cart.map((product) => ({
            productId: product.id,
            cantidad: product.quantity,
            flavors: product.flavors.map((flavor) => ({
              flavorId: flavor.id,
              cantidad: flavor.stock,
            })),
            pickedFlavors: confirmedFlavors[product.id] || [],
          })),
        };

        const hasBombones = order.products.some(
          (product) => product.flavors.length > 0
        );

        if (!hasBombones) {
          reject("Debes seleccionar sabores para los bombones.");
        } else {
          resolve((window.location.href = "/ship"));
        }
      }, 1100);
    });

  const handlePlaceOrder = () => {
    const order = {
      userId: "27b817f0-3043-48a5-8ad4-d4e173f07765",
      products: cart.map((product) => ({
        productId: product.id,
        cantidad: 1,
        flavors: product.flavors.map((flavor) => ({
          flavorId: flavor.id,
          cantidad: 1,
        })),
        pickedFlavors: confirmedFlavors[product.id] || [],
      })),
    };

    axios
      .post("https://lachocoback.vercel.app/orders", order)
      .then((response) => {
        response;
        toast.success("¡Orden creada exitosamente!");
        console.log("Objeto order:", order);

        window.location.href = "/ship";
      })
      .catch((error) => {
        console.log("Objeto order:", order);

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(
            "Server responded with error status:",
            error.response.status
          );
          console.error("Response data:", error.response.data);
          toast.error(
            "Error al crear la orden: " + error.response.data.message
          );
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
          toast.error(
            "Error al crear la orden: No se recibió respuesta del servidor."
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
          toast.error("Error al crear la orden: " + error.message);
        }
      });
  };
  return (
    <section>
      <h3 className="text-2xl font-bold mb-4">Tu carrito</h3>
      <ul>
        {cart?.map((product) => (
          <CartItem
            key={product.id}
            product={product}
            onUpdateFlavors={handleUpdateFlavors}
          />
        ))}
      </ul>
      <div className=" h-2">
        {showTooltip && !completed && (
          <span className="tooltip absolute bg-slate-600 opacity-95 text-white text-xs px-2 py-1 rounded-md right-4">
            - Aún te faltan cargar sabores
          </span>
        )}
      </div>
      <div
        className="flex justify-between items-center mt-4 "
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span className="text-lg font-bold">Total:</span>
        <span
          className={`text-xl font-bold ${
            !completed ? "text-red-500" : "text-slate-500"
          }`}
        >
          ${total.toFixed(2)}
        </span>
      </div>
      {!handleUpdateFlavors() ? (
        <div className="flex rounded-xl p-2 mt-2 shadow justify-center text-red-300  hover:text-red-500 hover:scale-105 transition-all ease">
          <button
            onClick={() =>
              toast.promise(promise, {
                loading: `Serás redireccionado para pagar...`,
                success: "¡Muchas gracias de antemano! ❤",
                error: "Debes seleccionar sabores para los bombones.",
              })
            }
            className="text-xl font-bold"
            disabled
          >
            Aún tienes sabores pendientes
          </button>
        </div>
      ) : (
        <div className="flex rounded-xl p-2 mt-2 shadow justify-center hover:bg-green-500 hover:scale-105 transition-all ease">
          <button
            onClick={handlePlaceOrder}
            className="text-xl text-green-500 hover:text-white font-bold"
          >
            Calcular envio
          </button>
        </div>
      )}
    </section>
  );
}

export default Cart;
