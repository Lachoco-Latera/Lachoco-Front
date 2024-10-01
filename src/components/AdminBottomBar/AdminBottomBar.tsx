// import { FiShoppingCart } from "react-icons/fi";
// import { useCartStore } from "../../stores/useCartStore";
// import useFromStore from "../../hooks/useFromStore";
import { FiHome } from "react-icons/fi";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import { VITE_ADMIN_ID } from "@/config/envs";
// import { toast } from "sonner";
interface Props {
  onCartIconClick: () => void;
}

export default function BottomBar({ onCartIconClick }: Props) {
  onCartIconClick;
  // const cart = useFromStore(useCartStore, (state) => state.cart);
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();
  // const promise = () =>
  //   new Promise((resolve) =>
  //     setTimeout(
  //       () =>
  //         resolve((window.location.href = "https://www.mercadopago.com.ar")),
  //       1100
  //     )
  //   );
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white text-gray-700 py-4 shadow drop-shadow">
      <div className="container mx-auto md:w-10/12 px-4">
        <div className="flex md:flex-row flex-row-reverse items-center justify-evenly gap-10">
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {isSignedIn == true &&
          user.id === VITE_ADMIN_ID &&
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
          {/* <div className="relative">
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
          </div> */}
          {/* <div>
            <FaRegHeart
              size={28}
              className=" text-slate-800 hover:cursor-pointer"
              onClick={() => navigate(`/favorites`)}
            />
          </div> */}
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
