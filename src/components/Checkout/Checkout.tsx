import React, { useState } from "react";
import { toast } from "sonner";
const Checkout = ({ price, currency, productName }: any) => {
  const [pickedFlavors, setPickedFlavors] = useState<{
    [key: string]: boolean;
  }>({});
  const exaflavors = [
    "Vanilla",
    "Chocolate",
    "Strawberry",
    "Mint",
    "Caramel",
    "Lemon",
    "Blueberry",
    "Hazelnut",
    "Pistachio",
    "Cookies and Cream",
    "Raspberry",
    "Butterscotch",
    "Peach",
    "Coconut",
    "Cherry",
  ];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPickedFlavors((prevPickedFlavors) => ({
      ...prevPickedFlavors,
      [name]: checked,
    }));
  };
  const promise = () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve((window.location.href = "https://www.mercadopago.com.ar")),
        1100
      )
    );
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
    >
      <div>Checkout Aquí</div>
      <div>
        $ {price} {currency}
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        {exaflavors.map((flavor: string) => (
          <div key={flavor} className="flex items-center gap-1">
            <input
              type="checkbox"
              className="hover:cursor-pointer"
              name={flavor}
              checked={pickedFlavors[flavor] || false}
              onChange={handleCheckboxChange}
            />
            <label className="ml-1">{flavor}</label>
          </div>
        ))}
      </div>
      <div className="pt-4">
        <button
          className="
        shadow rounded-full p-4 hover:drop-shadow-xl 
        bg-rose-600 hover:bg-white
        hover:text-green-300 text-white 
        hover:scale-105 hover:font-bold text-xl
         cursor-pointer transition-all ease"
          onClick={() =>
            toast.promise(promise, {
              loading: `Serás redireccionado para pagar ${productName}...`,
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
  );
};

export default Checkout;
