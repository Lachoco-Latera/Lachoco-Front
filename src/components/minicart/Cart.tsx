import CartItem from "./CartItem";

import { useCartStore } from "../../stores/useCartStore";

// import useFromStore from "../../hooks/useFromStore";
import { toast } from "sonner";

function Cart({ similar }: any) {
  const { cart, confirmedFlavors } = useCartStore();

  let total = 0;
  if (cart) {
    //Con esto prohibo que vaya menor a 0, por más forzado que sea
    total = cart.reduce((acc, product) => {
      //@ts-ignore
      const quantity = Math.max(product.quantity as number, 0);
      //@ts-ignore
      return acc + product.price * quantity;
    }, 0);
  }
  //@ts-ignore
  let bombonesProducts = cart.filter(
    (product) => product.category.name === "bombones"
  );

  // Calcular la suma de presentaciones * quantity
  let totalPresentationQuantity = bombonesProducts.reduce(
    (total, product: any) => {
      return total + product.presentacion * product.quantity;
    },
    0
  );

  console.log(
    "Total de presentaciones * cantidad para productos 'bombones':",
    totalPresentationQuantity
  );
  //@ts-ignore
  const recomendations = similar;
  const promise = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const hasBombones = cart.some(
          (item) => item.category.name === "bombones"
        );
        if (hasBombones) {
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
          <CartItem key={product.id} product={product} />
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold">Total:</span>
        <span className="text-xl font-bold">${total.toFixed(2)}</span>
      </div>
      <div className="flex rounded-xl p-2 mt-2 shadow justify-center hover:bg-amber-100 hover:scale-105 transition-all ease">
        <button
          onClick={() =>
            toast.promise(promise, {
              loading: `Serás redireccionado para pagar...`,
              success: "Muchas gracias de antemano! ❤",
              error: "Debes seleccionar sabores para los bombones.",
            })
          }
        >
          Ordenar Ahora
        </button>
      </div>
    </section>
  );
}

export default Cart;
