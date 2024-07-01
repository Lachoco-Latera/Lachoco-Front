import { useState } from "react";

import { CambioMoneda } from "../CambioMoneda/CambioMoneda";

export const Footer = () => {
  const [monedaState, setMonedaState] = useState(false);

  const handleOnClick = () => {
    setMonedaState(!monedaState);
  };

  return (
    <>
      <footer className="w-full mt-12 shadow bg-white drop-shadow">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm  sm:text-center text-gray-400">
            © 2024 Tiempo de Chocolatear
          </span>

          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
            <li>
              <button
                className="hover:underline me-4 md:me-6 hover:text-slate-800 hover:scale-105 transition-all ease"
                onClick={handleOnClick}
              >
                Cambio de moneda ^
              </button>
            </li>

            {monedaState ? (
              <div className="w-[100px] h-[100px] absolute mb-[150px] right-96 bg-gray-300 z-20 flex flex-col justify-evenly">
                <CambioMoneda />{" "}
              </div>
            ) : null}

            <li className=" hover:scale-105  transition-all ease">
              <a
                href="#"
                className="hover:underline me-4 md:me-6 hover:text-slate-800"
              >
                Datos de la empresa
              </a>
            </li>
          <li className=" hover:scale-105  transition-all ease">
              <a
                href="#"
                className="hover:underline me-4 md:me-6 hover:text-slate-800 hover:scale-105  transition-all ease"
              >
                Politica de privacidad
              </a>
            </li>
          <li className=" hover:scale-105  transition-all ease">
              <a
                href="#"
                className="hover:underline me-4 md:me-6 hover:text-slate-800 hover:scale-105  transition-all ease"
              >
                Tarjetas de regalo
              </a>
            </li>
          <li className=" hover:scale-105  transition-all ease">
              <a
                href="#"
                className="hover:underline hover:text-slate-800 hover:scale-105  transition-all ease"
              >
                Centro de ayuda
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};
