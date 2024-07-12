//@ts-nocheck
import { useState } from "react";
import { CambioMoneda } from "../CambioMoneda/CambioMoneda";
import logo1 from "/images/facebook.png";
import logo2 from "/images/whatsapp.png";
import logo3 from "/images/instagram.png";

export const Footer = () => {
  const [monedaState, setMonedaState] = useState(false);

  const handleOnClick = () => {
    setMonedaState(!monedaState);
  };

  return (
    <>
      <footer className="w-full bg-gray-100 flex pb-16 md:pb-0 left-0 z-10 md:bottom-auto md:mb-0">
        <div className="w-full mx-auto max-w-screen-xl py-2 md:flex flex flex-col md:items-center md:justify-between items-center">
          <div className="md:flex flex-col ">
            <ul className="flex flex-wrap justify-center items-center mt-3 text-sm font-medium text-gray-600 sm:mt-0 py-4">
              <li>
                <button
                  className="hover:underline me-4 md:me-6 hover:text-sky-700"
                  onClick={handleOnClick}
                >
                  Cambio de moneda ^
                </button>
              </li>

              {monedaState ? (
                <div className="w-[100px] h-[100px] absolute mb-[150px] right-96 bg-gray-600 z-20 flex flex-col justify-evenly">
                  <CambioMoneda />
                </div>
              ) : null}

              <li>
                <a
                  href="#"
                  className="hover:underline me-4 md:me-6 text-gray-600"
                >
                  Datos de la empresa
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline me-4 md:me-6 text-gray-600"
                >
                  Politica de privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline me-4 md:me-6 text-gray-600"
                >
                  Tarjetas de regalo
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-600 me-4">
                  Centro de ayuda
                </a>
              </li>
            </ul>
            <ul className="flex justify-center items-center md:py-0 py-4">
              <li>
                <a href="#" className="hover:underline">
                  <img src={logo1} alt="" className="me-4 w-8" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  <img src={logo2} alt="" className="me-4 w-8" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  <img src={logo3} alt="" className="me-4 w-8" />
                </a>
              </li>
            </ul>
          </div>
          <span className="flex text-sm sm:text-center text-gray-600 py-4">
            © 2024 Tiempo de Chocolatear
          </span>
        </div>
      </footer>
    </>
  );
};
