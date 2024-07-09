import { useState } from "react";
import { GestionOrdenCompra } from "./Botonera/GestionOrdenCompra";
import { GestionFavoritos } from "./Botonera/GestionFavoritos";
import { GestionRedesSociales } from "./Botonera/GestionRedesSociales";
import { GestionImgProductos } from "./Botonera/GestionImgProductos";
import { GestionReviwsCalif } from "./Botonera/GestionReviwsCalif";
import { GestionCuponesDesc } from "./Botonera/GestionCuponesDesc";
import { GestionSaboresDisponibles } from "./Botonera/GestionSaboresDisponibles";
import { GestionPPyDatosEmpresa } from "./Botonera/GestionPPyDatosEmpresa";
import {
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineSearch,
} from "react-icons/ai"; // Importa los íconos

import Header from "../Header/Header";
import { products } from "../../mocks/data";
import AdminBottomBar from "../AdminBottomBar/AdminBottomBar";

const buttonConfig = [
  {
    label: "Gestión Sabores",
    state: "gestionSaboresDisponibles",
    component: <GestionSaboresDisponibles />,
  },
  {
    label: "Gestión Productos",
    state: "gestionImgProductos",
    component: <GestionImgProductos />,
  },
  {
    label: "Gestión de Órdenes",
    state: "gestionOrdenCompra",
    component: <GestionOrdenCompra />,
  },
  {
    label: "Gestión Favoritos",
    state: "gestionFavoritos",
    component: <GestionFavoritos />,
  },
  {
    label: "Cupones y Descuentos",
    state: "gestionCuponesDesc",
    component: <GestionCuponesDesc />,
  },
  {
    label: "Reviews y Calificaciones",
    state: "gestionReviwsCalif",
    component: <GestionReviwsCalif />,
  },
  {
    label: "Redes Sociales",
    state: "gestionRedesSociales",
    component: <GestionRedesSociales />,
  },
  {
    label: "Info de empresa",
    state: "gestionPPyDatosEmpresa",
    component: <GestionPPyDatosEmpresa />,
  },
];

export const Admin = () => {
  const [state, setState] = useState<string>();
  const [selectedOption, setSelectedOption] = useState<string>(""); // Estado para almacenar la opción seleccionada
  const [showExtraButtons, setShowExtraButtons] = useState<boolean>(false); // Estado para mostrar los botones adicionales
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
      case "buscar":
        handleSearchAction();
        break;
      default:
        // Puedes manejar un caso por defecto si es necesario
        break;
    }
    setShowExtraButtons(!showExtraButtons); // Alterna la visibilidad de los botones adicionales
  }

  function handleCartIconClick(): void {
    throw new Error("Function not implemented.");
  }

  function handleAddAction(): void {
    console.log("Acción: Añadir");
    // Implementa aquí la lógica para la acción de añadir
  }

  function handleDeleteAction(): void {
    console.log("Acción: Eliminar");
    // Implementa aquí la lógica para la acción de eliminar
  }

  function handleSearchAction(): void {
    console.log("Acción: Buscar");
    // Implementa aquí la lógica para la acción de buscar
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
        return { icon: <AiOutlinePlus size={24} />, color: "rose" }; // Valor por defecto
    }
  }

  const { icon, color } = getIconAndColor();
  return (
    <>
      <Header onCartIconClick={handleCartIconClick} products={products} />
      <div className="w-full min-h-screen">
        <div className="w-full bg-white shadow-xl p-4 flex flex-wrap justify-evenly items-center">
          {/* Renderiza los botones de configuración */}
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
        {/* Renderiza el componente correspondiente al estado seleccionado */}
        {buttonConfig.find((button) => button.state === state)?.component}
      </div>

      {/* Selector de opciones */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        {/* Botón de acción */}
        <button
          className={`bg-white hover:text-white 
            hover:bg-${color}-600 text-${color}-500 
            transition-all ease hover:scale-105 p-4 
            rounded-full shadow-xl drop-shadow-2xl
            hover:cursor-pointer`}
          onClick={handleActionButtonClick}
          // disabled={!selectedOption} // Deshabilita el botón si no hay opción seleccionada
        >
          {icon}
        </button>

        {/* Botones adicionales */}
        {showExtraButtons && (
          <div className="flex flex-col gap-2 absolute bottom-16">
            <button
              className={`bg-green-500 text-white hover:bg-white hover:text-green-500 p-4 rounded-full shadow-xl transition-all ease hover:scale-105`}
              onClick={() => console.log("Extra Button 1 Clicked")}
            >
              <AiOutlinePlus size={24} />
            </button>
            <button
              className={`bg-red-500 text-white hover:bg-white hover:text-red-500 p-4 rounded-full shadow-xl transition-all ease hover:scale-105`}
              onClick={() => console.log("Extra Button 2 Clicked")}
            >
              <AiOutlineDelete size={24} />
            </button>
            <button
              className={`bg-blue-500 text-white hover:bg-white hover:text-blue-500 p-4 rounded-full shadow-xl transition-all ease hover:scale-105`}
              onClick={() => console.log("Extra Button 3 Clicked")}
            >
              <AiOutlineSearch size={24} />
            </button>
          </div>
        )}
      </div>

      {/* Barra inferior en dispositivos móviles */}
      <div className="block md:hidden">
        <AdminBottomBar onCartIconClick={handleCartIconClick}></AdminBottomBar>
      </div>
    </>
  );
};
