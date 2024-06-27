import React from "react"

export const DatosEmpresa: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1>Información de la empresa:</h1>
        <h2>Tiempo de Chocolatear</h2>
        <h2>Contacto: ventas@lachoco-latera.com</h2>
        
        <div>
            <h2>Tiendas Físicas</h2>
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
            <h2>Horarios:</h2>
            <p>Lunes a Jueves 01:30 PM - 08:00 PM</p>
            <p>Viernes y Sábado 01:30 PM - 09:00 PM</p>
            <p>Domingos y Festivos 01:30 PM - 07:30 PM</p>
        </div>
        
        <div>
            <h2>Notas de Prensa:</h2>
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
  )
}
