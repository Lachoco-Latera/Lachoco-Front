import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../Header/Header";
import { Footer } from "./Footer";
import Drawer from "../Drawer";
import Cart from "../minicart/Cart";
import { Product } from "@/types";

export const DatosEmpresa: React.FC = () => {
  const handleCartIconClick = () => {};

  const { t } = useTranslation();

  const products: Product[] = [];

  return (
    <>
      <Header onCartIconClick={handleCartIconClick} products={products} />

      <div className="w-full h-full flex flex-col items-center p-4">
        <h1 className="text-2xl  font-bold mb-4 flex items-center justify-center ">
          {t("Company_info")}
        </h1>
        <div className="mb-4">
          <h2 className="text-xl text-center font-bold">{t("Company_time")}</h2>
          <h2 className="text-lg">{t("contact")}ventas@lachoco-latera.com</h2>
        </div>
        <div className="w-3/4 flex flex-col">
          <div className="w-full flex flex-row flex-wrap justify-center">
            <div className="flex flex-col">
              <h2 className="ml-6 text-xl  font-bold">{t("Company_store")}</h2>
              <div className="flex flex-col m-6">
                <h3 className="text-lg">Lachoco Latera | La Macarena</h3>
                <p className="text-lg">Bogotá, Colombia</p>
                <p className="text-lg">Cra. 4a # 26B-12</p>
                <p className="text-lg"> +57 3202506687</p>
                <p className="text-lg">
                  <a href="https://wa.me/+573202506687">
                  +57 3202506687
                  </a>
                </p>
                
              </div>
              {/* <div className="flex flex-col ml-6 mr-6">
                <p className="text-lg">Lachoco Latera | Segovia</p>
                <p className="text-lg">Segovia, España</p>
                <p className="text-lg">
                  <a href="https://wa.me/+34634089473" />
                  +34 634089473
                </p>
              </div> */}
            </div>
            <div className="w-1/2 h-72 flex flex-col justify-center items-center border-2 border-solid rounded-lg border-black">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.55621444117156!2d-74.06672248029659!3d4.6120171521723705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f999a2277daab%3A0x843450f0e335a8eb!2sLachoco%20Latera%20Chocolater%C3%ADa!5e0!3m2!1ses-419!2sar!4v1719507808939!5m2!1ses-419!2sar"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-72 rounded-lg"
              ></iframe>
            </div>
          </div>

          <div className="w-full flex flex-row flex-wrap justify-center ml-2 mt-6">
            <div className="flex flex-col">
              <h2 className="m-6 text-xl  font-bold">{t("Company_press")}</h2>
              <ul>
                <li className="ml-6 text-lg">
                  <a href="https://www.elespectador.com/entretenimiento/gente/con-sabor-a-chocolate-238588/">
                    Con sabor a chocolate.
                  </a>
                </li>
                <li className="ml-6 text-lg">
                  <a href="https://thecitypaperbogota.com/dining/bakeries-cafes/for-love-of-chocolate/">
                    For love of chocolate
                  </a>
                </li>
                <li className="ml-6 text-lg">
                  <a href="https://www.semana.com/especiales/festival-de-librerias-arcadia/articulo/la-choco-latera/29906/">
                    La Choco Latera
                  </a>
                </li>
                <li className="ml-6 text-lg">
                  <a href="https://www.eltiempo.com/archivo/documento/CMS-16362576">
                    Bebidas con chocolate: Otra forma de celebrar
                  </a>
                </li>
                <li className="ml-6 text-lg">
                  <a href="https://www.youtube.com/watch?v=BIOwq8iTKjk">
                    Mesa para Trece | Capítulo 7: SUMA IUIAI (Putumayo)
                  </a>
                </li>
                <li className="ml-6 text-lg">
                  <a href="https://www.eltiempo.com/archivo/documento/MAM-4779851">
                    Los chocolates de Marcela
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h2 className="m-6 text-xl  font-bold">{t("Company_hours")}</h2>
              <p className="ml-6 text-lg">
                <strong>{t("Company_days")}</strong> 01:30 PM - 08:00 PM
              </p>
              <p className="ml-6 text-lg">
                <strong>{t("Company_days")}</strong> 01:30 PM - 09:00 PM
              </p>
              <p className="ml-6 text-lg">
                <strong>{t("Company_days3")}</strong> 01:30 PM - 07:30 PM
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
