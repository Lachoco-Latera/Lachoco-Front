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


[
    {
      "id": "de00d029-439f-4914-8cc4-2f646eec7e65",
      "date": "2024-06-27",
      "status": "PENDING",
      "orderDetail": {
        "id": "8efd2b84-58f1-4f9c-929a-a4f5f366e6c1",
        "price": "195.00",
        "orderDetailProducts": [
          {
            "id": "122015e4-23ea-4c2e-973c-b3c0c5535b5b",
            "cantidad": 3,
            "pickedFlavors": [
              "fde11c41-7476-49e6-b8ae-1b43bbd875af"
            ],
            "product": {
              "id": "f9d6c0a7-7397-4daf-89c7-2c79afccf850",
              "name": "Bombas de chocolate",
              "presentacion": 8,
              "description": "Bombas de chocolate oscuro premium con 75% de cacao + Salsa de vainilla, elaborado con ingredientes de alta calidad.",
              "price": "65.00",
              "currency": "USD",
              "label": "SoloOnline",
              "isActive": true,
              "category": {
                "id": "11454ea8-a9d6-4798-bcfd-a2bfb9c59f74",
                "name": "bombas"
              }
            },
            "orderDetailFlavors": []
          }
        ]
      },
      "user": {
        "id": "27b817f0-3043-48a5-8ad4-d4e173f07765",
        "name": "Maria",
        "lastname": "Perez",
        "email": "crlziito04@gmail.com",
        "country": "Colombia",
        "password": "$2b$10$X/Bg/7xXhO.DFviDVAOQ.ODhTuGS3pOp/C3zq3o/R/XHOd7.UWWw2",
        "role": "CLIENT",
        "isActive": true,
        "suscriptionId": null,
        "customerId": null
      }
    },
    {
      "id": "50a747b7-8dd3-4ae7-b054-c934d8da4718",
      "date": "2024-06-24",
      "status": "PENDING",
      "orderDetail": {
        "id": "91356628-b732-421b-a509-e0ccd75101ef",
        "price": "80000.00",
        "orderDetailProducts": []
      },
      "user": {
        "id": "27b817f0-3043-48a5-8ad4-d4e173f07765",
        "name": "Maria",
        "lastname": "Perez",
        "email": "crlziito04@gmail.com",
        "country": "Colombia",
        "password": "$2b$10$X/Bg/7xXhO.DFviDVAOQ.ODhTuGS3pOp/C3zq3o/R/XHOd7.UWWw2",
        "role": "CLIENT",
        "isActive": true,
        "suscriptionId": null,
        "customerId": null
      }
    },
    {
      "id": "e550317a-dab1-4e79-bba9-42f7c69c8da3",
      "date": "2024-06-26",
      "status": "PENDING",
      "orderDetail": {
        "id": "8f5d24b1-a126-4cfb-8bec-4057e0b3b786",
        "price": "28500.00",
        "orderDetailProducts": []
      },
      "user": {
        "id": "27b817f0-3043-48a5-8ad4-d4e173f07765",
        "name": "Maria",
        "lastname": "Perez",
        "email": "crlziito04@gmail.com",
        "country": "Colombia",
        "password": "$2b$10$X/Bg/7xXhO.DFviDVAOQ.ODhTuGS3pOp/C3zq3o/R/XHOd7.UWWw2",
        "role": "CLIENT",
        "isActive": true,
        "suscriptionId": null,
        "customerId": null
      }
    },
    {
      "id": "30d9079b-dc47-4968-81fb-41e0f99784af",
      "date": "2024-06-25",
      "status": "PENDING",
      "orderDetail": {
        "id": "6af925d0-2992-4642-8770-529f8599aca0",
        "price": "28500.00",
        "orderDetailProducts": []
      },
      "user": {
        "id": "27b817f0-3043-48a5-8ad4-d4e173f07765",
        "name": "Maria",
        "lastname": "Perez",
        "email": "crlziito04@gmail.com",
        "country": "Colombia",
        "password": "$2b$10$X/Bg/7xXhO.DFviDVAOQ.ODhTuGS3pOp/C3zq3o/R/XHOd7.UWWw2",
        "role": "CLIENT",
        "isActive": true,
        "suscriptionId": null,
        "customerId": null
      }
    },
    {
      "id": "64ed6010-cf66-4f09-86d2-632aaae51ec5",
      "date": "2024-06-26",
      "status": "PENDING",
      "orderDetail": {
        "id": "508571f6-cda9-4d3d-9197-5655bd3b8406",
        "price": "28500.00",
        "orderDetailProducts": []
      },
      "user": {
        "id": "27b817f0-3043-48a5-8ad4-d4e173f07765",
        "name": "Maria",
        "lastname": "Perez",
        "email": "crlziito04@gmail.com",
        "country": "Colombia",
        "password": "$2b$10$X/Bg/7xXhO.DFviDVAOQ.ODhTuGS3pOp/C3zq3o/R/XHOd7.UWWw2",
        "role": "CLIENT",
        "isActive": true,
        "suscriptionId": null,
        "customerId": null
      }
    }
  ]