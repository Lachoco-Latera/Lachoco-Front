import { useState } from "react";
// import { GestionarCarrito } from "./Botonera/GestionarCarrito";
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
import AdminBottomBar from "../AdminBottomBar/AdminBottomBar";
const buttonConfig = [
  // {
  //   label: "Carritos de Compra",
  //   state: "gestionCarrito",
  //   component: <GestionarCarrito />,
  // },
  {
    label: "Gestión Productos",
    state: "gestionImgProductos",
    component: <GestionImgProductos />,
  },
  {
    label: "Gestión Sabores",
    state: "gestionSaboresDisponibles",
    component: <GestionSaboresDisponibles />,
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
      <div className="block md:hidden">
        <AdminBottomBar onCartIconClick={handleCartIconClick}></AdminBottomBar>
      </div>
    </>
  );
};
