import React, { useEffect, useState } from "react";
import axios from "axios";

export const GestionOrdenCompra = ({ signal, onCloseModal }: any) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [ordersState, setOrdersState] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (signal) {
      setModalOpen(true);
    }
  }, [signal]);

  const closeModal = () => {
    setModalOpen(false);
    onCloseModal(); // Llama a la función para cerrar el modal y actualizar signal en Admin
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditState(!editState);
    setModalOpen(true); // Abrir el modal al hacer clic en editar
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          "https://lachocoback.vercel.app/orders"
        );
        const data = response.data;
        setOrdersState(data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const handleButtonDelete = async (id: string) => {
    try {
      // Aquí se debería agregar la lógica para eliminar la orden usando su ID
      const response = await axios.delete(
        `https://lachocoback.vercel.app/orders/${id}`
      );
      const deletedOrder = response.data;
      console.log(`Orden eliminada correctamente: ${deletedOrder}`);
      // Actualizar la lista de órdenes después de eliminar
      setOrdersState(ordersState.filter((order) => order.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <form className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-lime-500">
              <input
                type="text"
                placeholder="probando123"
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="probando123"
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="probando123"
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="probando123"
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="probando123"
                className="p-2 border rounded-md"
              />
            </form>
          </div>
        </div>
      )}

      <div className="w-full flex flex-row flex-wrap gap-4 px-4 py-8 justify-center items-center">
        {ordersState.map((order) => (
          <div
            key={order.id}
            className="w-[300px] min-h-[350px] flex flex-col justify-evenly px-4 rounded-xl bg-white shadow-xl transition-all duration-500 ease-in-out transform hover:scale-105"
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
                className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold bg-yellow-600 hover:bg-yellow-900 hover:text-yellow-500 m-3 capitalize transition-all duration-400 ease-in-out transform hover:scale-105"
                onClick={handleEdit}
              >
                editar
              </button>
              <button
                className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold bg-red-500 hover:bg-red-900 hover:text-red-500 m-3 capitalize transition-all duration-400 ease-in-out transform hover:scale-105"
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
