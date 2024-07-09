import { FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "../../stores/useCartStore";
import useFromStore from "../../hooks/useFromStore";
import SearchExampleStandard from "../Searchbar/Searchbar";
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

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function Header({ onCartIconClick }: Props) {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();
  const promise = () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve((window.location.href = "https://www.mercadopago.com.ar")),
        1100
      )
    );

  if (isSignedIn && isLoaded && user && user.primaryEmailAddress) {
    const passTransform = `${user.id}${import.meta.env.VITE_USER_KEY}`;
    const sliceKey = import.meta.env.VITE_PASS_SLICE;
    const start = parseInt(sliceKey[0]);
    const end = parseInt(sliceKey.slice(1));
    hashPassword(passTransform).then((hashedPassword) => {
      const trimmedPassword = hashedPassword.slice(start, end) || "";
      if (user.primaryEmailAddress) {
        const userData = {
          name: user.firstName,
          lastname: user.lastName,
          email: user.primaryEmailAddress.emailAddress,
          country: "GLOBAL",
          password: trimmedPassword,
        };
      }
    });
  }

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
          {isSignedIn == true &&
          user.id !== "user_2ilWGvh9587cCuvrttNuLQrY0jD" &&
          isLoaded ? (
            <button
              type="button"
              title="Suscribete"
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
          ) : null}
          <div className="relative  hidden md:block"></div>
          <div className="relative  hidden md:block">
            <button
              type="button"
              title="Favoritos"
              className="text-gray-800 text-xl flex items-center hover:scale-110 transition-all ease"
              onClick={() => navigate("/favorites")}
            >
              <MdFavoriteBorder size={28} />
            </button>
          </div>
          {isSignedIn == true &&
          user.id !== "user_2ilWGvh9587cCuvrttNuLQrY0jD" &&
          isLoaded ? (
            <div className="relative  hidden md:block">
              <button
                type="button"
                title="Carrito"
                className="text-gray-800 text-xl flex items-center hover:scale-110 transition-all ease"
                onClick={onCartIconClick}
              >
                <FiShoppingCart size={28} />
                <div className="text-white rounded-full bg-gray-700 w-5 h-5 text-sm -ml-[0.7em] -mt-5">
                  {cart?.length}
                </div>
              </button>
            </div>
          ) : null}
          {isSignedIn == true &&
          user.id === "user_2ilWGvh9587cCuvrttNuLQrY0jD" &&
          isLoaded ? (
            <div className="relative  hidden md:block">
              <button
                type="button"
                title="Admin"
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
          <div className="md:block hidden scale-125 hover:scale-150 transition-all ease">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  );
}
