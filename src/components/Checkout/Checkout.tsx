import { toast } from "sonner";
import { useCartStore } from "../../stores/useCartStore";

const Checkout = ({
  id,
  price,
  currency,
  productName,
  openModal,
  productCategory,
  flavorQuantity,
  confirmedFlavors,
}: any) => {
  const { cart } = useCartStore();
  const promise = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const hasBombones = cart.some(
          (item) => item.category.name === "bombones"
        );

        if (
          hasBombones &&
          confirmedFlavors !== flavorQuantity &&
          productCategory === "bombones"
        ) {
          reject("Debes seleccionar sabores para los bombones.");
        } else {
          resolve((window.location.href = "https://www.mercadopago.com.ar"));
        }
      }, 1100);
    });

  const isCartItem = cart.some((item) => item.id === id);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toast.promise(promise, {
      loading: `Serás redireccionado para pagar ${productName}...`,
      success: "¡Muchas gracias de antemano! ❤",
      error: "Debes seleccionar sabores para los bombones.",
    });
  };

  return (
    <div
      className="
        px-8 py-8 rounded-xl 
        text-slate-700
        drop-shadow-md
        hover:drop-shadow-2xl ease 
        transition-all bg-white     
        flex flex-col gap-2 text-center max-w-sm
      "
      onClick={() => openModal()}
    >
      <h2 className="text-xl font-bold">Precio Individual</h2>
      <div>
        $ {price} {currency}
      </div>
      <div className="pt-4">
        {productCategory === "bombones" ||
        confirmedFlavors !== flavorQuantity ? (
          <button
            className="
              shadow rounded-full p-4 hover:drop-shadow-xl 
              bg-rose-600 hover:bg-white
              hover:text-green-300 text-white 
              hover:scale-105 hover:font-bold text-xl
              cursor-pointer transition-all ease"
          >
            Seleccionar sabores
          </button>
        ) : (
          <>
            {isCartItem ? (
              <button
                className="
                  shadow rounded-full p-4 hover:drop-shadow-xl 
                  bg-rose-600 hover:bg-white
                  hover:text-green-300 text-white 
                  hover:scale-105 hover:font-bold text-xl
                  cursor-pointer transition-all ease"
                onClick={handleButtonClick}
              >
                Comprar ahora
              </button>
            ) : (
              <button
                className="
                  shadow rounded-full p-4 hover:drop-shadow-xl 
                  hover:bg-white
                  hover:text-red-300 text-black 
                  hover:scale-105 hover:font-bold text-xl
                  cursor-not-allowed transition-all ease"
                disabled
              >
                Debes agregar este producto al carrito
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
