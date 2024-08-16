/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { IOrders } from "@/helpers/type";
import { VITE_BASE_URL } from "@/config/envs";

export const GestionOrdenCompra = ({ signal, onCloseModal }: any) => {
  const [editFormState, setEditFormState] = useState<IOrders>({
    id: "",
    date: "",
    status: "",
  });
  const [ordersState, setOrdersState] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  useEffect(() => {
    if (signal) {
      setModalOpen(true);
    }
  }, [signal]);

  const closeModal = () => {
    setModalOpen(false);
    onCloseModal(); // Llama a la función para cerrar el modal y actualizar signal en Admin
  };

  // const handleEdit = (event: React.MouseEvent, orderId: string) => {
  //   event.preventDefault();
  //   const orderToEdit = ordersState.find((order) => order.id === orderId);
  //   if (orderToEdit) {
  //     setEditFormState(orderToEdit);
  //     setEditingOrderId(orderId);
  //   }
  //   setModalOpen(true); // Abrir el modal al hacer clic en editar
  // };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}/orders`
        );
        const data = response.data;
        setOrdersState(data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);
  console.log(ordersState);
  const handleButtonDelete = async (id: string) => {
    const alertId = toast("¿Deseas eliminar la orden seleccionada?", {
      duration: 5000,
      action: {
        label: "Aceptar",
        onClick: async () => {
          toast.dismiss(alertId);
          try {
            const response = await axios.delete(
              `${VITE_BASE_URL}/orders/${id}`
            );
            const deletedOrder = response.data;
            console.log(`Orden eliminada correctamente: ${deletedOrder}`);
            setOrdersState(ordersState.filter((order) => order.id !== id));
            toast.success(
              `La orden se elimino correctamente: ${deletedOrder}`,
              {
                duration: 5000,
              }
            );
          } catch (error) {
            console.log(error);
          }
        },
      },
    });
  };

  const handleOnChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditFormState({
      ...editFormState,
      [name]: value,
    });
  };

  const handleOnSubmitEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(editFormState);
    const alertId = toast("¿Deseas editar la orden seleccionada?", {
      duration: 5000,
      action: {
        label: "Aceptar",
        onClick: async () => {
          toast.dismiss(alertId);
          try {
            const response = await axios.patch(
              `${VITE_BASE_URL}/orders/${editFormState.id}`,
              {
                date: editFormState.date,
                status: editFormState.status,
              }
            );
            const updatedOrder = response.data;
            console.log(`Orden editada correctamente: ${updatedOrder}`);
            setOrdersState((prevOrders) =>
              prevOrders.map((order) =>
                order.id === updatedOrder.id ? updatedOrder : order
              )
            );
            setModalOpen(false);
            setEditingOrderId(null);
            toast.success("La orden se editó correctamente", {
              duration: 5000,
            });
          } catch (error) {
            console.log(error);
            toast.error("Error al editar la orden", {
              duration: 5000,
            });
          }
        },
      },
    });
  };

  return (
    <>
      {modalOpen && 1 < 0 && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              className="w-[500px] h-[300px] flex flex-col justify-evenly items-center"
              onSubmit={handleOnSubmitEdit}
            >
              <div>
                <label htmlFor="id">ID: </label>
                <input
                  type="text"
                  name="id"
                  value={editFormState.id}
                  className="p-2 border rounded-md"
                  readOnly // ID no debería ser editable
                />
              </div>
              <div>
                <label htmlFor="date">Date: </label>
                <input
                  type="text"
                  name="date"
                  value={editFormState.date}
                  className="p-2 border rounded-md"
                  onChange={handleOnChangeEdit}
                />
              </div>
              <div>
                <label htmlFor="status">Status: </label>
                <input
                  type="text"
                  name="status"
                  value={editFormState.status}
                  className="p-2 border rounded-md"
                  onChange={handleOnChangeEdit}
                />
              </div>
              {/* <div>
                <label htmlFor="user">User: </label>
                <input
                  type="text"
                  name="user"
                  value={editFormState.user}
                  className="p-2 border rounded-md"
                  onChange={handleOnChangeEdit}
                />
              </div> */}
              <button className="w-2/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold duration-400 bg-green-500 hover:bg-green-900 hover:text-green-500 m-3 capitalize hover:scale-105 transition-all ease">
                Guardar Cambios
              </button>
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
            <h2 className="font-bold">order n°: {order.id}</h2>
            <p className="font-bold">date: {order.date}</p>
            <p className="font-bold">status: {order.status}</p>
            <p className="font-bold">
              user: {order.user?.name} {order.user?.lastname}
            </p>
            <p className="font-bold">id user: {order.user?.id}</p>
            <p className="font-bold">
              user is active?: {order.user.isActive ? "True" : "False"}
            </p>
            <div className="w-full flex justify-center items-center">
              {/* <button
                className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold bg-yellow-600 hover:bg-yellow-900 hover:text-yellow-500 m-3 capitalize transition-all duration-400 ease-in-out transform hover:scale-105"
                onClick={(event) => handleEdit(event, order.id)}
              >
                editar
              </button> */}
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
