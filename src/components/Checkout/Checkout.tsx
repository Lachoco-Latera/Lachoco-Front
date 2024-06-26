import React, { useState } from "react";

const Checkout = ({ price, currency }: any) => {
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

  return (
    <div
      className="
        px-8 py-48 rounded-xl 
        text-white
        hover:drop-shadow-2xl ease 
        transition-all bg-red-900     
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
      <div>
        <button className="shadow rounded-3xl p-4 bg-red-800 hover:scale-105 cursor-pointer transition-all ease">
          Comprár ahora
        </button>
      </div>
    </div>
  );
};

export default Checkout;
