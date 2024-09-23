import { FiHome, FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "../../stores/useCartStore";
import useFromStore from "../../hooks/useFromStore";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaRegHeart } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { LuPackageOpen } from "react-icons/lu";
import { LiaCrownSolid } from "react-icons/lia";
import { MdOutlineCardGiftcard } from "react-icons/md";
interface Props {
  onCartIconClick: () => void;
}

export default function BottomBar({ onCartIconClick }: Props) {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();
  const promise = () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            (window.location.href =
              "https://lachoco-latera.com/?category=cafes")
          ),
        1100
      )
    );
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white text-gray-700 py-4 shadow drop-shadow">
      <div className="container mx-auto md:w-10/12 px-4">
        <div className="flex md:flex-row flex-row-reverse items-center justify-evenly gap-4">
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {isSignedIn == true &&
          user.id === "user_2ilWGvh9587cCuvrttNuLQrY0jD" &&
          isLoaded ? (
            <div>
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
          {isSignedIn ? (
            <>
              {/* <div className="relative md:hidden">
                <button
                  type="button"
                  title="Favoritos"
                  className="text-gray-800 text-xl flex items-center hover:scale-110 transition-all ease"
                  onClick={() => navigate("/inventory")}
                >
                  <LuPackageOpen size={28} />
                </button>
              </div> */}
              {/* <div>
                <button
                  type="button"
                  title="Mini Cart"
                  className="
              text-gray-800
              rounded-3xl py-1 px-3 text-xl flex items-center 
              hover:scale-110 transition-all ease"
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
                  <LiaCrownSolid size={34} />
                </button>
              </div> */}
              {/* <div>
                <FaRegHeart
                  size={28}
                  className=" text-slate-800 hover:cursor-pointer"
                  onClick={() => navigate(`/favorites`)}
                />
              </div> */}
            </>
          ) : null}
          <div className="relative  hidden md:block">
            <button
              type="button"
              title="Gift Card"
              className="text-gray-800 text-xl md:flex items-center hover:scale-110 transition-all ease"
              onClick={() => navigate("/gift-cards")}
            >
              <MdOutlineCardGiftcard size={24} />
            </button>
          </div>
          <div>
            <button
              type="button"
              title="Mini Cart"
              className="
              text-gray-800   
              rounded-3xl py-1 px-3 text-xl flex items-center 
              hover:scale-110 transition-all ease "
              onClick={() => navigate(`/`)}
            >
              <FiHome size={28} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
