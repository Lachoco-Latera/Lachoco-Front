import { toast } from "sonner";

const Checkout = ({ price, currency, productName, openModal }: any) => {
  const promise = () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve((window.location.href = "https://www.mercadopago.com.ar")),
        1100
      )
    );

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toast.promise(promise, {
      loading: `Serás redireccionado para pagar ${productName}...`,
      success: () => {
        return `Muchas gracias de antemano! ❤`;
      },
      error: "Error",
    });
  };

  return (
    <div
      className="
        px-8 py-48 rounded-xl 
        text-slate-700
        drop-shadow-md
        hover:drop-shadow-2xl ease 
        transition-all bg-white     
        flex flex-col gap-2 text-center max-w-sm
      "
      onClick={() => openModal()}
    >
      <h2 className="text-xl font-bold">Precio Final</h2>
      <div>
        $ {price} {currency}
      </div>
      <div className="pt-4">
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
      </div>
    </div>
  );
};

export default Checkout;
