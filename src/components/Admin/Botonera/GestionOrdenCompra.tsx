import React, { useEffect, useState } from "react";
import axios from "axios";

export const GestionOrdenCompra = () => {
  const [editState, setEditState] = useState<boolean>(false);
  const [ordersState, setOrdersState] = useState<any[]>([]); // Cambiado a array para manejar múltiples órdenes

  console.log(ordersState, "<<<<<<<<<<<<----- ORDER STATE");

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditState(!editState);
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          "https://lachocoback.vercel.app/orders"
        );
        const data = response.data;
        console.log(data, "<<<<---------- data get orders back");
        setOrdersState(data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const handleButtonDelete = (id: string) => {
    id;
    const deleteOrder = async () => {
      try {
        // Aquí se debería agregar la lógica para eliminar la orden usando su ID
        const data = "order eliminada correctamente";
        alert(data);
      } catch (error) {
        console.log(error);
      }
    };
    deleteOrder();
  };

  return (
    <>
      <div className="w-full flex flex-row flex-wrap gap-4 p-2 justify-center items-center">
        {editState === true ? (
          <form
            action=""
            className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-lime-500"
          >
            <input type="text" placeholder="probando123" />
            <input type="text" placeholder="probando123" />
            <input type="text" placeholder="probando123" />
            <input type="text" placeholder="probando123" />
            <input type="text" placeholder="probando123" />
          </form>
        ) : null}

        {ordersState.map((order) => (
          <div
            key={order.id}
            className="w-[300px] min-h-[350px] flex flex-col justify-evenly px-4 rounded-xl bg-white shadow-xl"
          >
            <h2 className="font-bold ">order n°: {order.id}</h2>
            <p className="font-bold ">date: {order.date}</p>
            <p className="font-bold ">status: {order.status}</p>
            <p className="font-bold ">
              user: {order.user?.name} {order.user?.lastname}
            </p>
            <p className="font-bold ">id user: {order.user?.id}</p>
            <p className="font-bold ">user active: {order.user?.isActive}</p>
            <div className="w-full flex justify-center items-center">
              <button
                className="w-1/3 h-[40px] xl:text-xl 
                text-white p-1 block rounded-2xl font-semibold 
                duration-400 bg-yellow-600 hover:bg-yellow-900 
                hover:text-yellow-500 m-3 capitalize hover:scale-105
                transition-all ease"
                onClick={handleEdit}
              >
                editar
              </button>
              <button
                className="w-1/3 h-[40px] xl:text-xl text-white 
                p-1 block rounded-2xl font-semibold duration-400 
                bg-red-500 hover:bg-red-900 hover:text-red-500 
                m-3 capitalize hover:scale-105 transition-all ease"
                onClick={() => handleButtonDelete(order.id)}
              >
                eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
