//@ts-nocheck
import { useState } from "react";
import { CambioMoneda } from "../CambioMoneda/CambioMoneda"
import logo1 from '/images/facebook.png'
import logo2 from '/images/whatsapp.png'
import logo3 from '/images/instagram.png'

export const Footer = () => {
  const [monedaState, setMonedaState] = useState(false);

  const handleOnClick = () => {
    setMonedaState(!monedaState);
  };

  return (
    <>
        <footer className="w-full bg-gray-100">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm  sm:text-center text-gray-600">© 2024 Tiempo de Chocolatear</span>
                    
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-600 sm:mt-0">
                    <li>
                        <button className="hover:underline me-4 md:me-6 hover:text-sky-700" onClick={handleOnClick} >Cambio de moneda ^</button>
                    </li>

                    {
                        monedaState ? ( <div className='w-[100px] h-[100px] absolute mb-[150px] right-96 bg-gray-600 z-20 flex flex-col justify-evenly' ><CambioMoneda/> </div> ) : (null)
                    }

                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 text-gray-600">Datos de la empresa</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 text-gray-600">Politica de privacidad</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 text-gray-600">Tarjetas de regalo</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline text-gray-600 me-4">Centro de ayuda</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline"><img src={logo1} alt="" className="me-4 w-8"/></a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline"><img src={logo2} alt="" className="me-4 w-8"/></a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline"><img src={logo3} alt="" className="me-4 w-8"/></a>
                    </li>
                </ul>
            </div>
        </footer>
    </>
  )
}


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
              <div className="w-[100px] h-[120px] absolute bottom-12 pb-10 bg-white z-20 flex flex-col justify-evenly rounded-t-xl">
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
