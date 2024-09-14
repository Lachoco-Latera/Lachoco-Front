import React, { useState, useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import { toast } from "sonner";
import { Product } from "@/types.d";
import { IoIosRefresh, IoMdExit } from "react-icons/io";
import { TbShoppingCartX } from "react-icons/tb";
import { useTranslation } from "react-i18next";

interface Props {
  product: Product;
  closeModal: () => void;
}

const FlavorModal: React.FC<Props> = ({ product, closeModal }) => {
  const {
    cart,
    //@ts-ignore
    totalItems,
    confirmedFlavors,
    addConfirmedFlavors,
    removeConfirmedFlavors,
  } = useCartStore(); // Usando useCartStore dentro del componente

  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]); //guarda los sabores seleccionados ej ["chocolate-id, vainilla-id"]
  const [lastSelectedProductId, setLastSelectedProductId] =
    useState<string>(""); //guarda el ultimo id del producto seleccionado ej ["vainilla-id"]
  const [lastPickedFlavor, setLastPickedFlavor] = useState<string>(""); //guarda el ultimo sabor seleccionado ej "fresa-id"
  const [flavorCounts, setFlavorCounts] = useState<{ [key: string]: number }>(
    {}
  ); //guarda un objeto donde cada clave es un id de sabor ej si se selecciona una vez chocolate y dos veces fresa {"chocolate-id": 2,"fresa-id": 1}
  const [moreOptions, setMoreOptions] = useState(false);

  const { t } = useTranslation();
 console.log('sabores',flavorCounts)
  let total = 0;
  if (cart) {
    //calcula el precio total de los productos del carrito
    total = cart.reduce((acc, product) => {
      const quantity = Math.max(product.quantity as number, 0);
      const price = parseFloat(product.price);
      return acc + price * quantity;
    }, 0);
  }

  const handleIncreaseFlavor = (flavorId: string) => {
    if (selectedFlavors.length < product.presentacion) {
      //los sabores seleccionados son la cantidad maxima permitida por la presentacion
      setSelectedFlavors([...selectedFlavors, flavorId]); //se agrega el nuevo sabor
      setFlavorCounts((prevCounts) => ({
        ...prevCounts,
        [flavorId]: (prevCounts[flavorId] || 0) + 1, //se agrega el nuevo sabor a el count que quedaria algo asi flavorCounts = { chocolate: 2, vainilla: 1,}
      }));
    } else {
      toast.error(t("Toast_limitFlavors"));
    }
  };

  const handleDecreaseFlavor = (flavorId: string) => {
    if (flavorCounts[flavorId] > 0) {
      setSelectedFlavors((prevSelectedFlavors) => {
        const index = prevSelectedFlavors.indexOf(flavorId);
        if (index !== -1) {
          return [
            ...prevSelectedFlavors.slice(0, index),
            ...prevSelectedFlavors.slice(index + 1),
          ];
        }
        return prevSelectedFlavors;
      });
      setFlavorCounts((prevCounts) => ({
        ...prevCounts,
        [flavorId]: prevCounts[flavorId] - 1,
      }));
    } else {
      toast.error(t("Toast_0"));
    }
  };
  
  const handleFillWithLastFlavor = () => {
    if (selectedFlavors.length < product.presentacion) {
      let flavorToAdd = lastPickedFlavor;

      if (!flavorToAdd && product.flavors.length > 0) {
        //si el flavorToAdd esta vacio y quedan sabores disponibles
        flavorToAdd =
          product.flavors[Math.floor(Math.random() * product.flavors.length)] //agrega uno random
            .id;
      }

      const flavorName =
        product.flavors.find((flavor) => flavor.id === flavorToAdd)?.name || ""; //nombre del sabor

      setSelectedFlavors([...selectedFlavors, flavorToAdd]); //se agrega el ultimo sabor

      setFlavorCounts((prevCounts) => ({
        ...prevCounts,
        [flavorToAdd]: (prevCounts[flavorToAdd] || 0) + 1, //el objeto se incrementa
      }));

      setLastSelectedProductId(flavorToAdd);

      toast(`${t("flavor")} ${flavorName} ${t("Toast_select")}`, {
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
      setSelectedFlavors([...selectedFlavors, randomFlavor.name]);
      setFlavorCounts((prevCounts) => ({
        ...prevCounts,
        [randomFlavor.name]: (prevCounts[randomFlavor.name] || 0) + 1,
      }));
      toast(`${t("flavor")} ${randomFlavor.name} ${t("Toast_added")}`, {
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

  useEffect(() => {
    if (selectedFlavors.length === 0) {
      setMoreOptions(false);
    }
  }, [selectedFlavors]);

  const maxFlavors = //calcula el maximo de sabores permitidos
    product.presentacion *
    cart.reduce((acc, item: any) => {
      if (item.id === product.id) {
        return acc + item.quantity;
      }
      return acc;
    }, 0);

  const actualSelectionLength = confirmedFlavors[product.id]?.length || 0;

  const handleGuardarSeleccion = () => {
    if (
      selectedFlavors.length === product.presentacion &&
      actualSelectionLength < maxFlavors
    ) {
      addConfirmedFlavors(product.id, selectedFlavors);
      toast.success(`${t("Toast_savedFlavor")} ${product.name}`);
    } else {
      toast.error(
        t("Toast_check")
      );
      setMoreOptions(true);
    }
  };

  const handleResetFlavors = () => {
    setMoreOptions(false);
    setSelectedFlavors([]);
    setFlavorCounts({});
    removeConfirmedFlavors(product.id);
  };

  const handleDeleteConfirmedFlavors = () => {
    const updatedConfirmedFlavors = { ...confirmedFlavors };
    delete updatedConfirmedFlavors[product.id];

    removeConfirmedFlavors(product.id);

    toast.success(`${t("Toast_removed")} ${product.name}`);

    closeModal();
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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
                  className="bg-red-500 hover:scale-105 hover:bg-white hover:drop-shadow-xl transition-all ease hover:text-red-500 text-white font-bold py-2 px-2 rounded-2xl shadow-xl"
                  onClick={handleResetFlavors}
                >
                  <IoIosRefresh size={20} />
                </button>
              ) : (
                <button
                  className="bg-slate-400 text-white transition-all ease font-bold py-2 px-2 rounded-2xl border border-white opacity-30 shadow-xl"
                  disabled
                >
                  <IoIosRefresh size={20} />
                </button>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">{t("Flavor_choose")}</h2>
            {actualSelectionLength === maxFlavors && (
              <div className=" bg-white rounded-2xl py-1 font-bold text-slate-600 shadow-xl text-center pointer-events-none">
                {t("Flavor_reset")}
              </div>
            )}
            <div className="flex flex-wrap justify-center items-center gap-4 pb-12 pt-2 ">
              {product.flavors.map((flavor) => (
                <div
                  key={flavor.id}
                  className={`relative flex flex-row items-center gap-2 py-2 px-4 rounded-2xl hover:shadow-lg transition-all ease-out ${
                    actualSelectionLength === maxFlavors
                      ? "cursor-not-allowed grayscale"
                      : "hover:cursor-pointer hover:scale-105"
                  }`}
                >
                  <div className="flex flex-col justify-center items-center gap-2">
                    <img
                      src={product.images[0]}
                      alt={flavor.name}
                      className="w-16 h-16 rounded"
                    />
                    <div>
                      <p className="text-lg font-semibold">{flavor.name}</p>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-2">
                      <button
                        className={`${
                          !flavorCounts[flavor.name]
                            ? "bg-gray-800 opacity-50 hover:bg-gray-950"
                            : "bg-red-500 hover:bg-red-600"
                        } text-white font-bold py-0 px-[7px] rounded-full`}
                        onClick={() => handleDecreaseFlavor(flavor.name)}
                        disabled={!flavorCounts[flavor.name]}
                      >
                        -
                      </button>
                      <span>{flavorCounts[flavor.name] || 0}</span>{" "}
                      {/* Muestra la cantidad seleccionada */}
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-0 px-[6px] rounded-full"
                        onClick={() => handleIncreaseFlavor(flavor.name)}
                        disabled={
                          selectedFlavors.length >= product.presentacion
                        } // Deshabilita si se alcanzó el máximo
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 pl-6 border-l border-gray-200">
            <h2 className="text-2xl font-bold mb-4">{t("Flavor_number")}</h2>
            <div>
              <div className=" text-lg">
                {t("Flavor_max")} <b className=" text-red-600">{maxFlavors}</b>
              </div>
              <div className="flex flex-row justify-center items-center gap-2">
                <span className=" text-2xl">{selectedFlavors.length}</span>
                <p className=" text-2xl font-bold ">/</p>
                <span className=" text-2xl font-bold">
                  {product.presentacion}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2 mt-6">
              <p className="flex flex-row text-lg justify-center items-center gap-2">
                {t("Flavor_total")}
                <b
                  className={` ${
                    actualSelectionLength === maxFlavors
                      ? "text-red-400"
                      : "text-green-400"
                  } text-xl`}
                >
                  {actualSelectionLength}
                </b>
                <i
                  className={`p-1 rounded-full drop-shadow-xl hover:cursor-pointer hover:shadow-xl hover:scale-110 transition-all ease ${
                    actualSelectionLength === maxFlavors
                      ? "text-red-400"
                      : "text-slate-200"
                  }`}
                  onClick={() => handleDeleteConfirmedFlavors()}
                >
                  <TbShoppingCartX size={20} />
                </i>
              </p>
              <p className="text-lg">
                {t("Flavor_priceT")} ${total}
              </p>
            </div>
            <div className="pt-4">
              {selectedFlavors.length > 0 && (
                <>
                  <button
                    className={` ${
                      actualSelectionLength === maxFlavors
                        ? "hover:text-red-500 hidden"
                        : "hover:text-green-300"
                    } bg-rose-600 hover:bg-white
                 text-white 
                 shadow-xl
                  cursor-pointer transition-all ease 
                  hover:scale-105 hover:font-bold text-xl
                  rounded-full p-4 hover:drop-shadow-xl`}
                    onClick={handleGuardarSeleccion} // Llama a handleGuardarSeleccion en lugar del onClick original
                  >
                    {t("Flavor_save")}
                  </button>

                  {selectedFlavors.length < product.presentacion &&
                    actualSelectionLength !== maxFlavors &&
                    moreOptions && (
                      <div className="flex justify-center mt-4">
                        <button
                          className="bg-orange-500 hover:bg-white hover:text-orange-500 text-white font-bold py-2 px-4 rounded-2xl shadow-xl mr-2 transition-all ease hover:scale-105"
                          onClick={handleFillWithLastFlavor}
                        >
                          {t("Flavor_latest")}
                        </button>
                        <button
                          className="bg-yellow-500 hover:bg-white hover:text-yellow-500 text-white font-bold py-2 px-4 rounded-2xl shadow-xl transition-all ease hover:scale-105"
                          onClick={handleAddRandomFlavor}
                        >
                          {t("Flavor_random")}
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
