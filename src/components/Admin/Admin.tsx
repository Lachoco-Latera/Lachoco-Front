import { useState } from "react"
import { GestionarCarrito } from "./Botonera/GestionarCarrito";
import { GestionOrdenCompra } from "./Botonera/GestionOrdenCompra";
import { GestionFavoritos } from "./Botonera/GestionFavoritos";
import { GestionRedesSociales } from "./Botonera/GestionRedesSociales";
import { GestionImgProductos } from "./Botonera/GestionImgProductos";
import { GestionReviwsCalif } from "./Botonera/GestionReviwsCalif";
import { GestionCuponesDesc } from "./Botonera/GestionCuponesDesc";
import { GestionSaboresDisponibles } from "./Botonera/GestionSaboresDisponibles";
import { GestionPPyDatosEmpresa } from "./Botonera/GestionPPyDatosEmpresa";

export const Admin = () => {
    const [state, setState] = useState<string>();

    const handleButton = (prop: string) => {
        setState(prop)
    }
  return (
    <>
        <div className="w-full min-h-screen">
        <div className="w-full bg-gray-600  flex flex-wrap justify-evenly items-center">
            <button className="text-gray-900 font-bold text-center xl:text-xl  capitalize duration-500  hover:text-white m-3" onClick={() => {handleButton('gestionCarrito')}}> Carritos de Compra</button>
            <button  className="text-gray-900 font-bold text-center xl:text-lg  capitalize duration-500  hover:text-white m-2" onClick={() => {handleButton('gestionOrdenCompra')}}>Ordenes de Compra</button>
            <button  className="text-gray-900 font-bold text-center xl:text-lg  capitalize duration-500  hover:text-white m-2" onClick={() => {handleButton('gestionSaboresDisponibles')}}>Sabores Disponibles</button>
            <button  className="text-gray-900 font-bold text-center xl:text-lg  capitalize duration-500  hover:text-white m-2" onClick={() => {handleButton('gestionFavoritos')}}>Favoritos</button>
            <button  className="text-gray-900 font-bold text-center xl:text-lg  capitalize duration-500  hover:text-white m-2" onClick={() => {handleButton('gestionRedesSociales')}}>Redes Sociales</button>
            <button  className="text-gray-900 font-bold text-center xl:text-lg  capitalize duration-500  hover:text-white m-2" onClick={() => {handleButton('gestionPPyDatosEmpresa')}}>PdP y Datos de la Empresa</button>
            <button  className="text-gray-900 font-bold text-center xl:text-lg  capitalize duration-500  hover:text-white m-2" onClick={() => {handleButton('gestionImgProductos')}}>Img Productos</button>
            <button  className="text-gray-900 font-bold text-center xl:text-lg  capitalize duration-500  hover:text-white m-2" onClick={() => {handleButton('gestionReviwsCalif')}}>Reviws y Calificaciones</button>
            <button  className="text-gray-900 font-bold text-center xl:text-lg  capitalize duration-500  hover:text-white m-2" onClick={() => {handleButton('gestionCuponesDesc')}}>Cupones y Descuentos</button>
            
        </div>
        {
            state === 'gestionCarrito' ? (<GestionarCarrito/>) : (null) 
        }
        {
            state === 'gestionOrdenCompra' ? (<GestionOrdenCompra/>) : (null) 
        }
        {
            state === 'gestionSaboresDisponibles' ? (<GestionSaboresDisponibles/>) : (null) 
        }
        {
            state === 'gestionFavoritos' ? (<GestionFavoritos/>) : (null) 
        }
        {
            state === 'gestionRedesSociales' ? (<GestionRedesSociales/>) : (null) 
        }
        {
            state === 'gestionPPyDatosEmpresa' ? (<GestionPPyDatosEmpresa/>) : (null) 
        }
        {
            state === 'gestionImgProductos' ? (<GestionImgProductos/>) : (null) 
        }
        {
            state === 'gestionReviwsCalif' ? (<GestionReviwsCalif/>) : (null) 
        }
        {
            state === 'gestionCuponesDesc' ? (<GestionCuponesDesc/>) : (null) 
        }
        </div>
    </>
  )
}

