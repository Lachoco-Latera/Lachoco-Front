import { FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "../../stores/useCartStore";

import useFromStore from "../../hooks/useFromStore";

import SearchExampleStandard from "../Searchbar/Searchbar";

// import { useState } from "react";
// import { IconoUser } from "../IconoUser/IconoUser.tsx";
// import iconoUser from "../../../public/images/iconoUser.svg";
// import close from "../../../public/images/close.svg";
// import config from "../../../public/images/configuracion.svg";
import logo from "../../../public/images/logo.png";
import { Product } from "@/types.d";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { toast } from "sonner";
import { MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
interface Props {
  onCartIconClick: () => void;
  products: Product[];
}

export default function Header({ onCartIconClick }: Props) {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  // const [stateUser, setStateUser] = useState(false);

  // const handleButtonUser = () => {
  //   setStateUser((prevState) => !prevState);
  //   // console.log(stateUser);
  // };
  const promise = () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve((window.location.href = "https://www.mercadopago.com.ar")),
        1100
      )
    );
  return (
    <header
      className=" 
    z-10 bg-white text-gray-700 
    py-4 flex items-center 
    justify-between h-18 
    sticky top-0 shadow"
    >
      <nav className="container mx-auto md:w-10/12 px-4 flex md:justify-between justify-between items-center">
        <span className="text-lg font-semibold hidden md:block">
          <img
            src={logo}
            className="w-28 cursor-pointer hover:scale-105 hover:drop-shadow-sm transition-all ease duration-200"
            alt="Lachoco-Latera logo"
            onClick={() => (window.location.href = "/")}
          />
        </span>
        <div className="hover:drop-shadow transition-all ease ">
          <SearchExampleStandard />
        </div>
        <div className="flex flex-row items-center gap-10">
          <div className="relative  hidden md:block">
            <button
              type="button"
              title="Mini Cart"
              className="
              text-gray-800 hover:text-white hover:bg-pink-500 
              rounded-3xl py-1 px-3 text-xl flex items-center 
              hover:scale-110 transition-all ease shadow"
              onClick={() =>
                toast.promise(promise, {
                  loading: `Serás redireccionado para suscribirte...`,
                  success: () => {
                    return `Muchas gracias de antemano! ❤`;
                  },
                  error: "Error",
                })
              }
            >
              ¡Suscribete!
            </button>
          </div>
          <div className="relative  hidden md:block">
            <button
              type="button"
              title="Mini Cart"
              className="text-gray-800 text-xl flex items-center hover:scale-110 transition-all ease"
              onClick={() => navigate("/favorites")}
            >
              <MdFavoriteBorder size={28} />
            </button>
          </div>
          <div className="relative  hidden md:block">
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
          {isSignedIn == true &&
          user.id === "user_2ilWGvh9587cCuvrttNuLQrY0jD" &&
          isLoaded ? (
            <div className="relative  hidden md:block">
              <button
                type="button"
                title="Mini Cart"
                className="
              text-gray-800   
              rounded-3xl py-1 px-3 text-xl flex items-center 
              hover:scale-110 transition-all ease "
                onClick={() => navigate(`/admin`)}
              >
                <GrUserAdmin size={28} />
              </button>
            </div>
          ) : null}
          {/* <div className="hidden md:block">
            {stateUser ? (
              <button onClick={handleButtonUser}>
                <img
                  src={close}
                  alt=""
                  className="w-[25px] h-[25px] transition-all ease duration-100"
                />
              </button>
            ) : (
              <button onClick={handleButtonUser}>
                <img src={iconoUser} alt="" className="w-[23px] h-[23px]" />
              </button>
            )}
          </div> */}
          {/* BOTON DE CONFIGURACION */}
          {/* <div className="hidden md:block">
            <button>
              <img src={config} alt="" className="w-[30px] h-[30px]" />
            </button>
          </div> */}{" "}
          <div className="md:block hidden">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>{" "}
          {/* {stateUser ? (
            <div className="w-[300px] h-[100px] absolute mt-[150px] right-0 bg-gray-300 z-20 flex flex-col justify-evenly">
              <IconoUser />
            </div>
          ) : null} */}
        </div>
      </nav>
    </header>
  );
}
