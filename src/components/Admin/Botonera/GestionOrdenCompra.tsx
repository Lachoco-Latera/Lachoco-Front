import { IOrders } from '@/helpers/type'
import React, { useEffect, useState } from 'react'

export const GestionOrdenCompra = () => {
  const [editState, setEditState] = useState<boolean>(false)
  const [ordersState, setOrdersState] = useState<IOrders>()
  console.log(ordersState, '<<<<<<<<<<<<----- ORDER STATE')

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault
    setEditState(!editState)
  }

  useEffect(()=>{
    const getOrders = async () =>{
      try {
        const data = {
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
        console.log(data, '<<<<---------- data get orders back')
        setOrdersState(data)
      } catch (error) {
        console.log(error)
      }
    }
    getOrders()
  },[])

  const handleButtonDelete = () => {
    const deleteOrder = () => {
      try {
        const data = 'order eliminada correctamente'
        alert(data)
      } catch (error) {
        console.log(error)
      }
    }
    deleteOrder()
  }
  return (
    <>
    <div className="w-full flex flex-col justify-center items-center">
      {
        editState === true ? ( <form action="" className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-lime-500">
          <input type="text" placeholder="probando123" />
          <input type="text" placeholder="probando123" />
          <input type="text" placeholder="probando123" />
          <input type="text" placeholder="probando123" />
          <input type="text" placeholder="probando123" />
        </form>) : (null)
      }
       

        <div className="w-[300px] min-h-[350px] flex flex-col justify-evenly items-center bg-stone-500">
          <h2 className="font-bold text-amber-300 text-center">order n° {ordersState?.id}</h2>
          <p className="font-bold text-amber-300 text-center">date: {ordersState?.date}</p>
          <p className="font-bold text-amber-300 text-center">status: {ordersState?.status}</p>
          <p className="font-bold text-amber-300 text-center">user: {ordersState?.user?.name} {ordersState?.user?.lastname}</p>
          <p className="font-bold text-amber-300 text-center">id user: {ordersState?.user?.id}</p>
          <p className="font-bold text-amber-300 text-center">user active: {ordersState?.user?.isActive}</p>
          <div className="w-full flex justify-center items-center">
            <button className="w-1/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-yellow-600 hover:bg-yellow-900  hover:text-yellow-500 m-3 capitalize" onClick={handleEdit}>editar</button>
            <button className="w-1/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-red-500 hover:bg-red-900  hover:text-red-500 m-3 capitalize" onClick={handleButtonDelete}>eliminar</button>
          </div>
        </div>
    </div>
    
    </>
  )
}
