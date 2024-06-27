import { FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "../../stores/useCartStore";
import useFromStore from "../../hooks/useFromStore";
import { useState } from "react";
import { IconoUser } from "../IconoUser/IconoUser.tsx"; // Revisar import si es necesario
import iconoUser from "../../../public/images/iconoUser.svg";
import close from "../../../public/images/close.svg";
import config from "../../../public/images/configuracion.svg";

interface Props {
  onCartIconClick: () => void;
}

export default function BottomBar({ onCartIconClick }: Props) {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const [stateUser, setStateUser] = useState(false);

  const handleButtonUser = () => {
    setStateUser((prevState) => !prevState);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white text-gray-700 py-4 shadow drop-shadow">
      <div className="container mx-auto md:w-10/12 px-4">
        <div className="flex md:flex-row flex-row-reverse items-center justify-evenly gap-10">
          <div className="relative">
            <button
              type="button"
              title="Mini Cart"
              className="text-gray-800 text-xl flex items-center hover:scale-110 transition-all ease"
              onClick={onCartIconClick}
            >
              <FiShoppingCart size={28} />
              <div className="text-white rounded-full bg-gray-700 w-5 h-5 text-sm -ml-[0.7em] -mt-5">
                {cart?.length}
              </div>
            </button>
          </div>

          {/* BOTON DE USUARIO */}
          <div>
            <button onClick={handleButtonUser}>
              {stateUser ? (
                <img
                  src={close}
                  alt=""
                  className="w-[25px] h-[25px] transition-all ease duration-100"
                />
              ) : (
                <img src={iconoUser} alt="" className="w-[23px] h-[23px]" />
              )}
            </button>
          </div>

          {/* BOTON DE CONFIGURACION */}
          <div>
            <button>
              <img src={config} alt="" className="w-[30px] h-[30px]" />
            </button>
          </div>
        </div>
      </div>
      {stateUser && (
        <div className="w-[300px] h-[100px] absolute mt-[150px] right-0 bg-gray-300 z-20 flex flex-col justify-evenly">
          <IconoUser />
        </div>
      )}
    </footer>
  );
}
