import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineCardGiftcard } from "react-icons/md";
import { useCartStore } from "../../stores/useCartStore";
import useFromStore from "../../hooks/useFromStore";
import SearchExampleStandard from "../Searchbar/Searchbar";
import logo from "../../assets/images/logo.png";
import tinyLogo from "../../assets/images/tinyLogo.png";
import { useTranslation } from "react-i18next";

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
import axios from "axios";
import { useEffect, useState } from "react";
import { BiTask } from "react-icons/bi";
import { VITE_ADMIN_ID, VITE_BASE_URL } from "@/config/envs";

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
  const giftCard = useFromStore(useCartStore, (state) => state.giftCards)
  const { isSignedIn, user, isLoaded } = useUser();
  const [userCountry, setUserCountry] = useState<string>("");
  const {t} = useTranslation()

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

  useEffect(() => {
    const checkGeolocationPermission = async () => {
      try {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });
        permission;
      } catch (error) {
        console.error("Error al verificar permiso de geolocalización:", error);
      }
    };

    const getUserCountry = async () => {
      try {
        if (navigator.geolocation) {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            }
          );

          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );

          const country = response.data.address.country || "GLOBAL";
          let userCountry = country;

          switch (country) {
            case "Argentina":
              userCountry = "ARG";
              break;
            case "Bolivia":
              userCountry = "BOL";
              break;
            case "Brasil":
              userCountry = "BRA";
              break;
            case "Chile":
              userCountry = "CHL";
              break;
            case "Colombia":
              userCountry = "COL";
              break;
            case "Ecuador":
              userCountry = "ECU";
              break;
            case "Paraguay":
              userCountry = "PRY";
              break;
            case "Perú":
              userCountry = "PER";
              break;
            case "Uruguay":
              userCountry = "URY";
              break;
            case "Venezuela":
              userCountry = "VEN";
              break;
            default:
              userCountry = "GLOBAL";
              break;
          }
          setUserCountry(userCountry);
        } else {
          setUserCountry("GLOBAL");
        }
      } catch (error) {
        console.warn("Error obteniendo la ubicación del usuario:", error);
        setUserCountry("GLOBAL");
      }
    };
    checkGeolocationPermission();
    getUserCountry();
  }, []);

  const registerUser = async () => {
    if (
      isSignedIn &&
      user.primaryEmailAddress &&
      user.primaryEmailAddress.emailAddress
    ) {
      const passTransform = `${user.id}${import.meta.env.VITE_USER_KEY}`;
      const sliceKey = import.meta.env.VITE_PASS_SLICE;
      const start = parseInt(sliceKey[0]);
      const end = parseInt(sliceKey.slice(1));
      const specialCharacters = "!@#$%^&*()";
      hashPassword(passTransform).then((hashedPassword) => {
        let trimmedPassword = hashedPassword.slice(start, end) || "";

        // Ensure at least one uppercase character
        const firstLowerIndex = trimmedPassword.search(/[a-z]/);
        if (firstLowerIndex !== -1) {
          trimmedPassword =
            trimmedPassword.slice(0, firstLowerIndex) +
            trimmedPassword[firstLowerIndex].toUpperCase() +
            trimmedPassword.slice(firstLowerIndex + 1);
        }

        // Choose a special character based on the 'end' variable
        const specialCharacterIndex = end % specialCharacters.length;
        const specialCharacter = specialCharacters[specialCharacterIndex];
        trimmedPassword += specialCharacter;
        if (user.primaryEmailAddress && trimmedPassword) {
          const userData = {
            name: user.firstName,
            lastname: user.lastName,
            email: user.primaryEmailAddress.emailAddress,
            country: userCountry,
            password: trimmedPassword,
            confirmPassword: trimmedPassword,
          };
          axios
            .get(`${VITE_BASE_URL}/users`)
            .then((response) => {
              const existingUser = response.data.find(
                (existingUser: any) =>
                  existingUser.email === user.primaryEmailAddress?.emailAddress
              );
              if (!existingUser) {
                // Email does not exist, proceed with registration
                axios
                  .post(
                    `${VITE_BASE_URL}/users/register`,
                    userData
                  )
                  .then((response) => {
                    response;
                  })
                  .catch((error) => {
                    if (error.response) {
                      if (
                        error.response.status === 400 &&
                        error.response.data.message ===
                          "Password does not Match"
                      ) {
                        console.log(
                          "Error: La contraseña no coincide con los requisitos del servidor."
                        );
                      } else if (
                        error.response.status === 403 ||
                        error.response.data.message === "User already exists"
                      ) {
                        console.log("User already exists");
                      } else if (error.response.status === 409) {
                        console.log("Ready!");
                      } else {
                        console.error("Error registering user:", error);
                      }
                    } else {
                      console.error("Error registering user:", error);
                    }
                  });
              } else {
                // console.log("User already exists: ", user.firstName);
              }
            })
            .catch((error) => {
              console.error("Error checking existing users:", error);
            });
        }
      });
    }
  };

  useEffect(() => {
  // Call the registerUser function when needed
  // if (isSignedIn && isLoaded) {
  if (isSignedIn) {
    registerUser();
  }}), [isSignedIn];
  
  console.log('user id:', user?.id)
  console.log('env id:', VITE_ADMIN_ID)
  return (
    <header
      className=" 
    z-10 bg-white text-gray-700 
    py-4 flex items-center 
     h-18  justify-center
    sticky top-0 shadow"
    >
      <nav className="container self-center md:w-10/12 px-4 flex justify-between md:justify-between items-center md:gap-6">
        <span className="text-lg font-semibold hidden md:block">
          <img
            src={logo}
            className="md:block hidden md:w-28 md:min-w-16 cursor-pointer hover:scale-105 hover:drop-shadow-sm transition-all ease duration-200"
            alt="Lachoco-Latera logo"
            onClick={() => (window.location.href = "/")}
          />
        </span>
        <span className="block md:hidden min-w-12 text-lg font-semibold">
          <img
            src={tinyLogo}
            className="w-12 md:w-28 md:min-w-16 cursor-pointer hover:scale-105 hover:drop-shadow-sm transition-all ease duration-200"
            alt="Lachoco-Latera logo"
            onClick={() => (window.location.href = "/")}
          />
        </span>
        <div className="hover:drop-shadow transition-all ease ">
          <SearchExampleStandard />
        </div>
        <div className="flex flex-row items-center gap-4">
            {/* <button
              type="button"
              title="Suscribete"
              className="
              text-gray-800 hover:text-white hover:bg-pink-500 
              rounded-3xl py-1 px-3 text-xl  items-center 
              hover:scale-110 transition-all ease shadow hidden md:block"
              onClick={() =>
                toast.promise(promise, {
                  loading: t("Toast_suscribe"),
                  success: () => {
                    return t("Toast_thanks");
                  },
                  error: "Error",
                })
              }
            >
              {t("Subscribe")}
            </button> */}
          <div className="relative  hidden md:block"></div>
          {/* {isSignedIn == true && isLoaded ? (
            <div className="relative  hidden md:block">
              <button
                type="button"
                title="Favoritos"
                className="text-gray-800 text-xl md:flex items-center hover:scale-110 transition-all ease"
                onClick={() => navigate("/favorites")}
              >
                <MdFavoriteBorder size={28} />
              </button>
            </div>
          ) : null} */}
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
          {/* {isSignedIn ? (
            <>
              <div className="relative  hidden md:block">
                <button
                  type="button"
                  title="Lista de Ordenes"
                  className="text-gray-800 text-xl flex items-center hover:scale-110 transition-all ease"
                  onClick={() => navigate("/inventory")}
                >
                  <BiTask size={26}></BiTask>
                </button>
              </div>
            </>
          ) : null} */}
          {user?.id !== "user_2m6qxvEGjIZL9A7qdibGOs6NyAN" ? (
            <div className="relative  hidden md:block">
              <button
                type="button"
                title="Carrito"
                className="text-gray-800 text-xl flex items-center hover:scale-110 transition-all ease"
                onClick={onCartIconClick}
              >
                <FiShoppingCart size={24} />
                <div className="text-white rounded-full bg-gray-700 w-5 h-5 text-sm -ml-[0.7em] -mt-5">
                  {(cart?.length || 0) + (giftCard?.length || 0)}
                </div>
              </button>
            </div>
          ) : null}
          {isSignedIn &&
          user.id === VITE_ADMIN_ID ? (
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
