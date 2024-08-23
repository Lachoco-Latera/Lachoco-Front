// import { toast } from "sonner";
import { useCartStore } from "../../stores/useCartStore";
import { useTranslation } from "react-i18next";

const Checkout = ({
  id,
  price,
  currency,
  productName,
  openModal,
  productCategory,
  flavorQuantity,
  confirmedFlavors,
  product,
  openCartModal,
}: any) => {
  const { cart } = useCartStore();
  const addToCart = useCartStore((state) => state.addToCart);
  console.log(productName);
  const isCartItem = cart.some((item) => item.id === id);
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isCartItem) {
      addToCart(product);
    }
    openModal();
  };

  const {t} =useTranslation()

  return (
    <div
      className="
        px-8 py-8 rounded-xl 
        text-slate-700
        drop-shadow-md my-12
        hover:drop-shadow-2xl ease 
        transition-all bg-white     
        flex flex-col gap-2 text-center max-w-sm
      "
      onClick={() => openModal()}
    >
      <h2 className="text-xl font-bold">{t("Individual_Price")}</h2>
      <div>
        $ {price} {currency}
      </div>
      {/*Acá aclaración del llenado de la caja */}
      <div className="pt-4">
        {productCategory === "bombones" &&
        isCartItem &&
        confirmedFlavors !== flavorQuantity ? (
          <button
            className="
              shadow rounded-full p-4 hover:drop-shadow-xl 
              bg-rose-600 hover:bg-white
              hover:text-green-300 text-white 
              hover:scale-105 hover:font-bold text-xl
              cursor-pointer transition-all ease"
          >
            {t("Select_flavors")}
          </button>
        ) : (
          <>
            {(productCategory !== "bombones" && isCartItem) ||
            (confirmedFlavors === flavorQuantity && confirmedFlavors != 0) ? (
              <button
                className="
                  shadow rounded-full p-4 hover:drop-shadow-xl 
                  bg-rose-600 hover:bg-white
                  hover:text-green-300 text-white 
                  hover:scale-105 hover:font-bold text-xl
                  cursor-pointer transition-all ease"
                onClick={openCartModal}
              >
                {t("Order_now")}
              </button>
            ) : (
              <button
                className="
                  shadow rounded-full p-4 hover:drop-shadow-xl 
                  hover:bg-white
                  hover:text-green-300 text-black 
                  hover:scale-105 hover:font-bold text-xl
                  cursor-pointer transition-all ease"
                onClick={(e) => handleAddToCart(e)}
              >
                {t("Add")}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
