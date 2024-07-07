import { useState } from "react";
import { GestionarCarrito } from "./Botonera/GestionarCarrito";
import { GestionOrdenCompra } from "./Botonera/GestionOrdenCompra";
import { GestionFavoritos } from "./Botonera/GestionFavoritos";
import { GestionRedesSociales } from "./Botonera/GestionRedesSociales";
import { GestionImgProductos } from "./Botonera/GestionImgProductos";
import { GestionReviwsCalif } from "./Botonera/GestionReviwsCalif";
import { GestionCuponesDesc } from "./Botonera/GestionCuponesDesc";
import { GestionSaboresDisponibles } from "./Botonera/GestionSaboresDisponibles";
import { GestionPPyDatosEmpresa } from "./Botonera/GestionPPyDatosEmpresa";
import Header from "../Header/Header";
import { products } from "../../mocks/data";

const buttonConfig = [
  {
    label: "Carritos de Compra",
    state: "gestionCarrito",
    component: <GestionarCarrito />,
  },
  {
    label: "Ordenes de Compra",
    state: "gestionOrdenCompra",
    component: <GestionOrdenCompra />,
  },
  {
    label: "Sabores Disponibles",
    state: "gestionSaboresDisponibles",
    component: <GestionSaboresDisponibles />,
  },
  {
    label: "Favoritos",
    state: "gestionFavoritos",
    component: <GestionFavoritos />,
  },
  {
    label: "Redes Sociales",
    state: "gestionRedesSociales",
    component: <GestionRedesSociales />,
  },
  {
    label: "PdP y Datos de la Empresa",
    state: "gestionPPyDatosEmpresa",
    component: <GestionPPyDatosEmpresa />,
  },
  {
    label: "Img Productos",
    state: "gestionImgProductos",
    component: <GestionImgProductos />,
  },
  {
    label: "Reviws y Calificaciones",
    state: "gestionReviwsCalif",
    component: <GestionReviwsCalif />,
  },
  {
    label: "Cupones y Descuentos",
    state: "gestionCuponesDesc",
    component: <GestionCuponesDesc />,
  },
];

export const Admin = () => {
  const [state, setState] = useState<string>();

  const handleButton = (prop: string) => {
    setState(prop);
  };

  function handleCartIconClick(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Header onCartIconClick={handleCartIconClick} products={products} />
      <div className="w-full min-h-screen">
        <div className="w-full bg-white shadow-xl p-4 flex flex-wrap justify-evenly items-center">
          {buttonConfig.map((button) => (
            <button
              key={button.state}
              className="text-gray-900 font-bold text-center xl:text-lg capitalize duration-500 hover:text-white m-2"
              onClick={() => handleButton(button.state)}
            >
              {button.label}
            </button>
          ))}
        </div>
        {buttonConfig.find((button) => button.state === state)?.component}
      </div>
    </>
  );
};
