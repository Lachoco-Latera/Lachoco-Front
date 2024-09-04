//@ts-nocheck
import { useState } from "react";
import { CambioMoneda } from "../CambioMoneda/CambioMoneda";
import logo1 from "../../assets/images/facebook.png";
import logo2 from "../../assets/images/whatsapp.png";
import logo3 from "../../assets/images/instagram.png";
import { NavLink } from "react-router-dom";
import idioma from "../../assets/images/idioma.svg";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../hooks/LanguageContext";
import { DatosEmpresa } from "./DatosEmpresa";

export const Footer = () => {
  const [monedaState, setMonedaState] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <>
      <footer className="w-full bg-gray-100 flex pb-16 md:pb-0 left-0 z-10 md:bottom-auto md:mb-0">
        <div className="w-full mx-auto max-w-screen-xl py-2 md:flex flex flex-col md:items-center md:justify-between items-center">
          <div className="md:flex flex-col ">
            <ul className="flex flex-wrap justify-center items-center mt-3 text-sm font-medium text-gray-600 sm:mt-0 py-4">
              <li>
                <a
                  href="/company-info"
                  className="hover:underline me-4 md:me-6 text-gray-600"
                >
                  {t("company_info")}
                </a>
              </li>
              <li>
                <a
                  href="privacy-policy"
                  className="hover:underline me-4 md:me-6 text-gray-600"
                >
                  {t("privacy_policy")}
                </a>
              </li>
              <li>
                <a
                  href="/gift-cards"
                  className="hover:underline me-4 md:me-6 text-gray-600"
                >
                  {t("gift_cards")}
                </a>
              </li>
            </ul>
            <ul className="flex justify-center items-center md:py-0 py-4">
              <li>
                <a href="https://www.facebook.com/LachocoLateraChocolateria/?locale=es_ES" target="_blank" className="hover:underline">
                  <img src={logo1} alt="" className="me-4 w-8" />
                </a>
              </li>
              <li>
                <a href="https://wa.me/+573012985389" target="_blank" className="hover:underline">
                  <img src={logo2} alt="" className="me-4 w-8" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/lachoco_latera/?hl=es" target="_blank" className="hover:underline">
                  <img src={logo3} alt="" className="me-4 w-8" />
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-3 z-30 ">
            <div className="flex items-center justify-center my-4">
              <label htmlFor="language-select" className="sr-only">
                Select Language
              </label>
              <select
                id="language-select"
                className="p-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer transition-colors hover:border-y-fuchsia-600 focus:border-fuchsia-500"
                onChange={(e) => changeLanguage(e.target.value)}
                value={language}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
            <p className="flex text-sm sm:text-center text-gray-600 py-4">
              {t("footer_copyright")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
