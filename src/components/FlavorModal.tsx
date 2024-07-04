import React, { useState, useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import { toast } from "sonner";
import { Product } from "@/types.d";
import { IoMdExit } from "react-icons/io";

interface Props {
  product: Product;
  closeModal: () => void;
}

const FlavorModal: React.FC<Props> = ({ product, closeModal }) => {
  const { cart, totalItems, addConfirmedFlavors } = useCartStore(); // Agrega addConfirmedFlavors desde useCartStore
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [lastSelectedProductId, setLastSelectedProductId] =
    useState<string>("");
  const [lastPickedFlavor, setLastPickedFlavor] = useState<string>("");
  const [flavorCounts, setFlavorCounts] = useState<{ [key: string]: number }>(
    {}
  );
  const [moreOptions, setMoreOptions] = useState(false);

  let total = 0;
  if (cart) {
    total = cart.reduce((acc, product) => {
      const quantity = Math.max(product.quantity as number, 0);
      const price = parseFloat(product.price);
      return acc + price * quantity;
    }, 0);
  }

  const handleFlavorClick = (flavor: any) => {
    if (
      selectedFlavors.length < product.presentacion &&
      (!flavorCounts[flavor.id] ||
        flavorCounts[flavor.id] < product.presentacion)
    ) {
      setLastSelectedProductId(product.id);
      setLastPickedFlavor(flavor.id);
      setSelectedFlavors([...selectedFlavors, flavor.id]);

      setFlavorCounts((prevCounts) => ({
        ...prevCounts,
        [flavor.id]: (prevCounts[flavor.id] || 0) + 1,
      }));

      toast(`Sabor ${flavor.name} agregado!`, {
        action: {
          label: "Okay!",
          onClick: () => {
            console.log(`Cerrar modal de ${flavor.name}`);
            closeModal();
          },
        },
      });
    } else {
      toast.error(
        `Ya has alcanzado el límite de sabores para ${product.name}.`
      );
    }
  };

  const handleResetFlavors = () => {
    setMoreOptions(false);
    setSelectedFlavors([]);
    setFlavorCounts({});
  };

  const handleFillWithLastFlavor = () => {
    if (selectedFlavors.length < product.presentacion) {
      let flavorToAdd = lastPickedFlavor;

      if (!flavorToAdd && product.flavors.length > 0) {
        flavorToAdd =
          product.flavors[Math.floor(Math.random() * product.flavors.length)]
            .id;
      }

      const flavorName =
        product.flavors.find((flavor) => flavor.id === flavorToAdd)?.name || "";

      setSelectedFlavors([...selectedFlavors, flavorToAdd]);

      setFlavorCounts((prevCounts) => ({
        ...prevCounts,
        [flavorToAdd]: (prevCounts[flavorToAdd] || 0) + 1,
      }));

      setLastSelectedProductId(flavorToAdd);

      toast(`Sabor ${flavorName} agregado!`, {
        action: {
          label: "Okay!",
          onClick: () => {
            console.log(`Cerrar modal de ${flavorName}`);
            closeModal();
          },
        },
      });
    }
  };

  const handleAddRandomFlavor = () => {
    if (selectedFlavors.length < product.presentacion) {
      const randomFlavor =
        product.flavors[Math.floor(Math.random() * product.flavors.length)];
      setSelectedFlavors([...selectedFlavors, randomFlavor.id]);
      setFlavorCounts((prevCounts) => ({
        ...prevCounts,
        [randomFlavor.id]: (prevCounts[randomFlavor.id] || 0) + 1,
      }));
      toast(`Sabor ${randomFlavor.name} agregado!`, {
        action: {
          label: "Okay!",
          onClick: () => {
            console.log(`Cerrar modal de ${randomFlavor.name}`);
            closeModal();
          },
        },
      });
    }
  };

  useEffect(() => {
    console.log("Último producto seleccionado:", lastSelectedProductId);
  }, [lastSelectedProductId]);

  useEffect(() => {
    console.log("Sabores seleccionados:", selectedFlavors);
  }, [selectedFlavors]);

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
  useEffect(() => {
    if (selectedFlavors.length === 0) {
      setMoreOptions(false);
    }
  }, [selectedFlavors]);

  const handleGuardarSeleccion = () => {
    if (selectedFlavors.length === product.presentacion) {
      addConfirmedFlavors(product.id, selectedFlavors);
      toast.success(`Selección de sabores guardada para ${product.name}`);
    } else {
      toast.error("Por favor selecciona todos los sabores antes de guardar.");
    }
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
          <div className="flex flex-col pr-6 py-4">
            <div className="self-end">
              {selectedFlavors.length > 0 ? (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl shadow-xl"
                  onClick={handleResetFlavors}
                >
                  Reiniciar sabores
                </button>
              ) : (
                <button
                  className="bg-slate-500 text-white font-bold py-2 px-4 rounded-2xl border border-white opacity-30 shadow-xl"
                  disabled
                >
                  Reiniciar sabores
                </button>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-4">Elige tus sabores</h2>

            <div className="flex flex-wrap justify-center items-center gap-4 py-12">
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
                    </div>
                    {flavorCounts[flavor.id] && (
                      <div className="absolute bg-green-400 font-bold text-lg text-white py-1 px-2 shadow rounded-full">
                        <span>{`x${flavorCounts[flavor.id]}`}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 pl-6 border-l border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Cantidad de sabores</h2>
            <div>
              <div className="flex flex-row justify-center items-center gap-2">
                <span className=" text-2xl">{selectedFlavors.length}</span>
                <p className=" text-2xl font-bold ">/</p>
                <span className=" text-2xl font-bold">
                  {product.presentacion}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-lg">Total de sabores: {totalItems}</p>
              <p className="text-lg">Precio total: ${total.toFixed(2)}</p>
            </div>
            <div className="pt-4">
              {selectedFlavors.length > 0 && (
                <>
                  <button
                    className="
          bg-rose-600 hover:bg-white
          hover:text-green-300 text-white 
          cursor-pointer transition-all ease 
          hover:scale-105 hover:font-bold text-xl
          shadow rounded-full p-4 hover:drop-shadow-xl"
                    onClick={handleGuardarSeleccion} // Llama a handleGuardarSeleccion en lugar del onClick original
                  >
                    Guardar selección
                  </button>

                  {selectedFlavors.length < product.presentacion &&
                    moreOptions && (
                      <div className="flex justify-center mt-4">
                        <button
                          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-2xl shadow-xl mr-2"
                          onClick={handleFillWithLastFlavor}
                        >
                          Rellenar con último sabor
                        </button>
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-2xl shadow-xl"
                          onClick={handleAddRandomFlavor}
                        >
                          Añadir aleatoriamente
                        </button>
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorModal;
