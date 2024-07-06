import CartItem from "./CartItem";
import { useCartStore } from "../../stores/useCartStore";
import { toast } from "sonner";
import { useEffect, useState } from "react";

function Cart({ similar }: any) {
  const { cart, confirmedFlavors } = useCartStore();
  const [actualConfirmedFlavorsTotal, setActualConfirmedFlavorsTotal] =
    useState<number>(0);

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

  const totalPresentationQuantity = bombonesProducts.reduce(
    (total, product: any) => {
      return total + product.presentacion * product.quantity;
    },
    0
  );

  const handleUpdateFlavors = () => {
    // Función para verificar si todos los sabores están seleccionados
    const hasIncompleteFlavors = bombonesProducts.some((product) => {
      const productMaxFlavor = product.quantity * product.presentacion;
      const confirmedFlavorsCount = confirmedFlavors[product.id]?.length || 0;
      return confirmedFlavorsCount !== productMaxFlavor;
    });

    return !hasIncompleteFlavors;
  };

  const promise = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const hasBombones = bombonesProducts.length > 0;
        const flavorsCompleted = handleUpdateFlavors();

        if (hasBombones && !flavorsCompleted) {
          reject("Debes seleccionar sabores para los bombones.");
        } else {
          resolve((window.location.href = "https://www.mercadopago.com.ar"));
        }
      }, 1100);
    });

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
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold">Total:</span>
        <span className="text-xl font-bold">${total.toFixed(2)}</span>
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
        <div className="flex rounded-xl p-2 mt-2 shadow justify-center hover:bg-green-100 hover:scale-105 transition-all ease">
          <button
            onClick={() =>
              toast.promise(promise, {
                loading: `Serás redireccionado para pagar...`,
                success: "¡Muchas gracias de antemano! ❤",
                error: "Debes seleccionar sabores para los bombones.",
              })
            }
            className="text-xl text-green-500 font-bold"
          >
            Ordenar Ahora
          </button>
        </div>
      )}
    </section>
  );
}

export default Cart;
