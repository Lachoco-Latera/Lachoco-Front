import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Header from "../Header/Header";
import { Footer } from "./Footer";
import Drawer from "../Drawer";
import Cart from "../minicart/Cart";
import { Product } from "@/types";

export const PoliticaPrivacidad: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const handleCartIconClick = () => {
        // setIsDrawerOpen(!isDrawerOpen);
      };

    // const {t} = useTranslation()

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
            // {
            //   id: "1",
            //   img: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            //   https: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            // },
            // {
            //   id: "2",
            //   img: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            //   https: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            // },
          ],
        }
      ]
  return (
    <>
    <Header onCartIconClick={handleCartIconClick}  products={products}/>
    {/* <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
          <Cart similar={'1234'} />
        </Drawer> */}
    <div className=" w-full min-h-screen flex flex-col items-center p-4">
        <div className="text-3xl  font-bold w-3/4 mb-10 mt-10 flex items-center justify-center ">
            <h1 className=" ">Politica de privacidad</h1>  
        </div>
        
    <div className="w-3/4 ">
        <h2 className="text-xl  font-bold m-4">Introducción</h2>
        <p className="text-lg ml-4 text-justify">En Lachoco Latera, nos comprometemos a proteger la privacidad de nuestros clientes. Esta política de privacidad explica cómo recopilamos, usamos y compartimos la información personal que nos proporcionas.</p>

        <h2 className="text-xl  font-bold m-4">Información que Recopilamos</h2>
        <p className="text-lg ml-4 text-justify">Recopilamos información personal como tu nombre, dirección de correo electrónico, dirección de envío y detalles de pago cuando realizas una compra o te suscribes a nuestro boletín.</p>

        <h2 className="text-xl  font-bold m-4">Cómo Recopilamos la Información</h2>
        <p className="text-lg ml-4 text-justify">Recopilamos datos personales a través de formularios de contacto en nuestro sitio web, durante el proceso de compra y cuando te suscribes a nuestras comunicaciones promocionales.</p>

        <h2 className="text-xl  font-bold m-4">Uso de la Información</h2>
        <p className="text-lg ml-4 text-justify">Utilizamos tus datos para procesar tus pedidos, enviar confirmaciones de compra, responder a tus consultas y enviarte información sobre nuestras promociones y productos.</p>

        <h2 className="text-xl  font-bold m-4">Compartir Información con Terceros</h2>
        <p className="text-lg ml-4 text-justify">Podemos compartir tus datos con proveedores de servicios que nos ayudan a procesar pagos y enviar pedidos. Nos aseguramos de que estos terceros cumplan con estándares estrictos de protección de datos.</p>

        <h2 className="text-xl  font-bold m-4">Seguridad de los Datos</h2>
        <p className="text-lg ml-4 text-justify">Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra el acceso no autorizado y la pérdida.</p>

        <h2 className="text-xl  font-bold m-4">Derechos del Usuario</h2>
        <p className="text-lg ml-4 text-justify">Tienes derecho a acceder, corregir o eliminar tus datos personales. También puedes oponerte al uso de tus datos para fines de marketing.</p>

        <h2 className="text-xl  font-bold m-4">Cookies y Tecnologías Similares</h2>
        <p className="text-lg ml-4 text-justify">Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador.</p>

        <h2 className="text-xl  font-bold m-4">Retención de Datos</h2>
        <p className="text-lg ml-4 text-justify">Retendremos tus datos personales mientras sea necesario para cumplir con los fines para los cuales fueron recopilados, a menos que la ley exija lo contrario.</p>

        <h2 className="text-xl  font-bold m-4">Cambios en la Política de Privacidad</h2>
        <p className="text-lg ml-4 text-justify">Nos reservamos el derecho de modificar esta política de privacidad. Notificaremos cualquier cambio a través de nuestro sitio web.</p>

        <h2 className="text-xl  font-bold m-4">Contacto</h2>
        <p className="text-lg ml-4 text-justify">Si tienes alguna pregunta sobre nuestra política de privacidad o deseas ejercer tus derechos, puedes contactarnos en ventas@lachoco-latera.com o Cra. 4a # 26B-12, Bogotá, Colombia.</p>
    </div>
    </div>
    <Footer/> 
    </>
  )
}
