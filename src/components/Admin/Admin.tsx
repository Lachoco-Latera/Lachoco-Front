import { useState } from "react";
import { GestionOrdenCompra } from "./Botonera/GestionOrdenCompra";
import { GestionFavoritos } from "./Botonera/GestionFavoritos";
import { GestionRedesSociales } from "./Botonera/GestionRedesSociales";
import { GestionProductos } from "./Botonera/GestionProductos";
import { GestionReviwsCalif } from "./Botonera/GestionReviwsCalif";
import { GestionCuponesDesc } from "./Botonera/GestionCuponesDesc";
import { GestionSaboresDisponibles } from "./Botonera/GestionSaboresDisponibles";
import { GestionPPyDatosEmpresa } from "./Botonera/GestionPPyDatosEmpresa";
import {
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineSearch,
} from "react-icons/ai"; // Importa los íconos
import { IoMenu } from "react-icons/io5";

import Header from "../Header/Header";
import { products } from "../../mocks/data";
import AdminBottomBar from "../AdminBottomBar/AdminBottomBar";

export const Admin = () => {
  const [state, setState] = useState<string>();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showExtraButtons, setShowExtraButtons] = useState<boolean>(false);
  const [, setRefreshFlavors] = useState(false);
  const [signal, setSignal] = useState(false); // Nuevo estado para la señal

  const buttonConfig = [
    {
      label: "Gestión Sabores",
      state: "gestionSaboresDisponibles",
      component: (
        <GestionSaboresDisponibles
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ), // Pasa la señal como prop
    },
    {
      label: "Gestión Productos",
      state: "gestionImgProductos",
      component: (
        <GestionProductos
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
    {
      label: "Gestión de Órdenes",
      state: "gestionOrdenCompra",
      component: (
        <GestionOrdenCompra
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
    {
      label: "Gestión Favoritos",
      state: "gestionFavoritos",
      component: (
        <GestionFavoritos
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
    {
      label: "Cupones y Descuentos",
      state: "gestionCuponesDesc",
      component: (
        <GestionCuponesDesc
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
    {
      label: "Reviews y Calificaciones",
      state: "gestionReviwsCalif",
      component: (
        <GestionReviwsCalif
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
    {
      label: "Redes Sociales",
      state: "gestionRedesSociales",
      component: (
        <GestionRedesSociales
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
    {
      label: "Info de empresa",
      state: "gestionPPyDatosEmpresa",
      component: (
        <GestionPPyDatosEmpresa
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
  ];
  setSelectedOption;
  const handleButton = (prop: string) => {
    setState(prop);
  };

  function handleActionButtonClick(): void {
    switch (selectedOption) {
      case "añadir":
        handleAddAction();
        break;
      case "eliminar":
        handleDeleteAction();
        break;
      default:
        break;
    }
    setShowExtraButtons(!showExtraButtons); // Alterna la visibilidad de los botones adicionales
  }

  function handleCartIconClick(): void {
    throw new Error("Function not implemented.");
  }

  function handleAddAction(): void {
    setRefreshFlavors((prev) => !prev); // Enviar señal para refrescar sabores
    setSignal((prev) => !prev); // Enviar señal para el console.log
  }

  function handleDeleteAction(): void {
    console.log("Acción: Eliminar");
  }

  function getIconAndColor(): { icon: JSX.Element; color: string } {
    switch (selectedOption) {
      case "añadir":
        return { icon: <AiOutlinePlus size={24} />, color: "blue" };
      case "eliminar":
        return { icon: <AiOutlineDelete size={24} />, color: "orange" };
      case "buscar":
        return { icon: <AiOutlineSearch size={24} />, color: "rose" };
      default:
        return { icon: <IoMenu size={24} />, color: "rose" }; // Valor por defecto
    }
  }

  const { icon, color } = getIconAndColor();
  return (
    <>
      <Header onCartIconClick={handleCartIconClick} products={products} />
      <div className="w-full min-h-screen">
        <div className="w-full bg-white shadow-xl p-4 flex flex-wrap justify-evenly items-center">
          {buttonConfig?.map((button) => (
            <button
              key={button.state}
              className="text-slate-600 font-bold text-center 
              xl:text-lg m-2 hover:bg-rose-400 
              hover:text-white transition-all ease duration-400
              p-2 rounded-xl hover:shadow-xl hover:scale-105"
              onClick={() => handleButton(button.state)}
            >
              {button.label}
            </button>
          ))}
        </div>
        {buttonConfig.find((button) => button.state === state)?.component}
      </div>

      <div className="fixed md:bottom-4 bottom-20  right-4 flex flex-col gap-2">
        <button
          className={`bg-white hover:text-rose-500 
            hover:bg-${color}-600 text-${color}-500 
            transition-all ease hover:scale-105 p-4 
            rounded-full shadow-xl drop-shadow-2xl
            hover:cursor-pointer`}
          onClick={handleActionButtonClick}
        >
          {icon}
        </button>

        {showExtraButtons && (
          <div className="flex flex-col gap-2 absolute bottom-16">
            <button
              className={`bg-green-500 text-white hover:bg-white hover:text-green-500 p-4 rounded-full shadow-xl transition-all ease hover:scale-105`}
              onClick={() => handleAddAction()}
            >
              <AiOutlinePlus size={24} />
            </button>
            <button
              className={`bg-red-500 text-white hover:bg-white hover:text-red-500 p-4 rounded-full shadow-xl transition-all ease hover:scale-105`}
              onClick={() => console.log("Extra Button 2 Clicked")}
            >
              <AiOutlineDelete size={24} />
            </button>
          </div>
        )}
      </div>

      <div className="block md:hidden">
        <AdminBottomBar onCartIconClick={handleCartIconClick}></AdminBottomBar>
      </div>
    </>
  );
};
