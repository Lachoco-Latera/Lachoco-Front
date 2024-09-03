import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Header from "../Header/Header";
import { Footer } from "./Footer";
import Drawer from "../Drawer";
import Cart from "../minicart/Cart";
import { Product } from "@/types";

export const DatosEmpresa: React.FC = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const handleCartIconClick = () => {
        setIsDrawerOpen(!isDrawerOpen);
      };

    const {t} = useTranslation()

    const products: Product[] = [ 
        {
          id: "1",
          name: "Product 1",
          presentacion: 0,
          description: "Descripción del producto 1",
          quantity: 1,
          category: {
            id: "1",
            name: "Category 1",
            icon: 1,
          },
          price: "100",
          currency: "USD",
          label: "Nuevo",
          isActive: true,
          flavors: [
            {
              id: "1",
              name: "Flavor 1",
              stock: 1,
            },
            {
              id: "2",
              name: "Flavor 2",
              stock: 1,
            },
          ],
          images: [
            {
              id: "1",
              img: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
              https: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            },
            {
              id: "2",
              img: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
              https: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            },
          ],
        }
      ]

  return (
    <>
    <Header onCartIconClick={handleCartIconClick}  products={products}/>
    <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
          <Cart similar={'1234'} />
        </Drawer>
    <div className="w-full min-h-screen flex flex-col items-center justify-center">

        <h1>{t("Company_info")}</h1>
        <h2>{t("Company_time")}</h2>
        <h2>{t("contact")}ventas@lachoco-latera.com</h2>
        
        <div>
            <h2>{t("Company_store")}</h2>
            <p>Lachoco Latera | Segovia</p>
            <p>Segovia, España</p>
            <p>+34 634089473 (text link a whatsapp)</p>
        </div>
        
        <div className="w-3/4 flex justify-evenly items-center">
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.55621444117156!2d-74.06672248029659!3d4.6120171521723705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f999a2277daab%3A0x843450f0e335a8eb!2sLachoco%20Latera%20Chocolater%C3%ADa!5e0!3m2!1ses-419!2sar!4v1719507808939!5m2!1ses-419!2sar" width="300" height="250" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className="flex flex-col">
                <h3>Lachoco Latera | La Macarena</h3>
                <p>Bogotá, Colombia</p>
                <p>Cra. 4a # 26B-12</p>
                <p> +57 3012985389 (text link a whatsapp) </p>  
            </div>
        </div>
        
        <div>
            <h2>{t("Company_hours")}</h2>
            <p>{t("Company_days")} 01:30 PM - 08:00 PM</p>
            <p>{t("Company_days")} 01:30 PM - 09:00 PM</p>
            <p>{t("Company_days3")} 01:30 PM - 07:30 PM</p>
        </div>
        
        <div>
            <h2>{t("Company_press")}</h2>
            <ul>
                <li><a href="https://www.elespectador.com/entretenimiento/gente/con-sabor-a-chocolate-238588/">Con sabor a chocolate.</a></li>
                <li><a href="https://thecitypaperbogota.com/dining/bakeries-cafes/for-love-of-chocolate/">For love of chocolate</a></li>
                <li><a href="https://www.semana.com/especiales/festival-de-librerias-arcadia/articulo/la-choco-latera/29906/">La Choco Latera</a></li>
                <li><a href="https://www.eltiempo.com/archivo/documento/CMS-16362576">Bebidas con chocolate: Otra forma de celebrar</a></li>
                <li><a href="https://www.youtube.com/watch?v=BIOwq8iTKjk">Mesa para Trece | Capítulo 7: SUMA IUIAI (Putumayo)</a></li>
                <li><a href="https://www.eltiempo.com/archivo/documento/MAM-4779851">Los chocolates de Marcela</a></li>
            </ul>
        </div>
   </div>
        <Footer/> 
   </>
  )
}
