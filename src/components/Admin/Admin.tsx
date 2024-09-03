import { useEffect, useState } from "react";
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

import { Footer } from "../Footer/Footer";
import Header from "../Header/Header";
import { products } from "../../mocks/data";
import AdminBottomBar from "../AdminBottomBar/AdminBottomBar";
import { useTranslation } from "react-i18next";

export const Admin = () => {
  const {t} = useTranslation()
  const [state, setState] = useState<string>();
  const [selectedOption] = useState<string>("");
  const [showExtraButtons, setShowExtraButtons] = useState<boolean>(false);
  const [, setRefreshFlavors] = useState(false);
  const [signal, setSignal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const buttonConfig = [
    {
      label:t("Admin_Flavor"),
      state: "gestionSaboresDisponibles",
      component: (
        <GestionSaboresDisponibles
          signal={signal}
          onCloseModal={() => setSignal(false)}
          deleteItem={deleteItem}
        />
      ),
    },
    {
      label:t("Admin_Product"),
      state: "gestionImgProductos",
      component: (
        <GestionProductos
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
    {
      label:t("Admin_order"),
      state: "gestionOrdenCompra",
      component: (
        <GestionOrdenCompra
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
    {
      label:t("Admin_favorites"),
      state: "gestionFavoritos",
      component: (
        <GestionFavoritos
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
    {
      label:t("Admin_coupons"),
      state: "gestionCuponesDesc",
      component: (
        <GestionCuponesDesc
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
    {
      label:t("Admin_reviews"),
      state: "gestionReviwsCalif",
      component: (
        <GestionReviwsCalif
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
    {
      label:t("Admin_social"),
      state: "gestionRedesSociales",
      component: (
        <GestionRedesSociales
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
    {
      label:t("Admin_info"),
      state: "gestionPPyDatosEmpresa",
      component: (
        <GestionPPyDatosEmpresa
          signal={signal}
          onCloseModal={() => setSignal(false)}
        />
      ),
    },
  ];

  const handleButton = (prop: string) => {
    if (prop !== state) {
      setState(prop);
      setLoading(true); // Activa el estado de carga al seleccionar un nuevo buttonConfig
    }
  };

  useEffect(() => {
    setLoading(false); // Desactiva el estado de carga después de renderizar
  }, [state]); // Añade state como dependencia del useEffect

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
    setDeleteItem((prev) => !prev); // Enviar señal para el console.log
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
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
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
            {/* <button
              className={`bg-red-500 text-white hover:bg-white hover:text-red-500 p-4 rounded-full shadow-xl transition-all ease hover:scale-105`}
              onClick={() => console.log("Extra Button 2 Clicked")}
            >
              <AiOutlineDelete size={24} />
            </button> */}
          </div>
        )}
      </div>

      <div className="container">
        <h2>Resources</h2>
        <p>
          <a href="https://github.com/colbyfayock/cloudinary-examples/tree/main/examples/react-upload-widget-preset">
            See the code on github.com.
          </a>
        </p>
      </div>
      <div className="block md:hidden">
        <AdminBottomBar onCartIconClick={handleCartIconClick}></AdminBottomBar>
      </div>
      <Footer/>
    </>
  );
};
