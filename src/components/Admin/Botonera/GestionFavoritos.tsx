/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IFavorites, IGitfCards, IOrdersFavorites } from "@/helpers/type";
import { toast } from "sonner";

export const GestionFavoritos = ({ signal, onCloseModal }: any) => {
  const [editFormState, setEditFormState] = useState<IFavorites>({
    id: '',
    name: '',
    lastname: '',
    email: '',
    country: '',
    role: '',
    isActive: false,
    orders: [],
    giftcards: []
  });
  const [userState, setUserState] = useState<IFavorites[]>([]);
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

  const handleEdit = (event: React.MouseEvent, userId: string | undefined) => {
    event.preventDefault();
    const alertId = toast("¿Estas seguro de editar?", {
      duration: 5000,
      action: {
        label: "Aceptar",
        onClick: async () => {
          toast.dismiss(alertId);
          try {
            const userToEdit = userState.find(user => user.id === userId);
            if (userToEdit) {
              setEditFormState(userToEdit);
            }
            setModalOpen(true); // Abrir el modal al hacer clic en editar
          } catch (error) {
            console.log(error);
          }
        },
      },
    });
  };

  const handleOnSubmitEdit = (event: React.FormEvent) => {
    event.preventDefault()
    const alertId = toast("¿Estas seguro de editar?", {
      duration: 5000,
      action: {
        label: "Aceptar",
        onClick: async () => {
          toast.dismiss(alertId);
          try {
            // ACA VA LA LOGICA PARA HACER LA SOLICITUD AL BACK
            setModalOpen(false); // cerrar el modal al hacer clic en editar
            console.log('DATOS EDITADOS CON EXITOOOO WEY')
            toast.success ('Datos editados correctamente',{
              duration: 5000,
            } )
          } catch (error) {
            console.log(error);
          }
        },
      },
    });
  }

  const handleButtonDelete = async (id: string | undefined) => {
    const alertId = toast("¿Estas seguro de eliminar?", {
      duration: 5000,
      action: {
        label: "Aceptar",
        onClick: async () => {
          toast.dismiss(alertId);
          try {
            // Aquí se debería agregar la lógica para eliminar el usuario usando su ID
            console.log(`Eliminar usuario con id: ${id}`);
            // Simulando eliminación
            setUserState(userState.filter((user) => user.id !== id));
            toast.success ('La eliminacion se realizo con éxito',{
              duration: 5000,
            } )
          } catch (error) {
            console.log(error);
          }
        },
      },
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://lachocoback.vercel.app/users"
        );
        const data = response.data;
        setUserState(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleOnChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditFormState({
      ...editFormState,
      [name]: value,
    });
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
            <form className="w-[500px] h-[300px] flex flex-col justify-evenly items-center  " onSubmit={handleOnSubmitEdit}>
              <input
                type="text"
                name="name"
                value={editFormState.name}
                placeholder="Nombre"
                className="p-2 border rounded-md"
                onChange={handleOnChangeEdit}
              />
              <input
                type="text"
                name="lastname"
                value={editFormState.lastname}
                placeholder="Apellido"
                className="p-2 border rounded-md"
                onChange={handleOnChangeEdit}
              />
              <input
                type="text"
                name="email"
                value={editFormState.email}
                placeholder="Correo Electrónico"
                className="p-2 border rounded-md"
                onChange={handleOnChangeEdit}
              />
              <input
                type="text"
                name="country"
                value={editFormState.country}
                placeholder="País"
                className="p-2 border rounded-md"
                onChange={handleOnChangeEdit}
              />
              <input
                type="text"
                name="role"
                value={editFormState.role}
                placeholder="Rol"
                className="p-2 border rounded-md"
                onChange={handleOnChangeEdit}
              />
              <input
                type="checkbox"
                name="isActive"
                checked={editFormState.isActive}
                onChange={(event) => setEditFormState({
                  ...editFormState,
                  isActive: event.target.checked
                })}
              />
              <label>Active</label>
              <button className="w-2/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold duration-400 bg-green-500 hover:bg-green-900 hover:text-green-500 m-3 capitalize hover:scale-105 transition-all ease">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="w-full flex flex-row flex-wrap gap-4 px-4 py-8 justify-center items-center">
        {userState.map((user) => (
          <div
            key={user.id}
            className="w-[300px] min-h-[400px] flex flex-col justify-evenly px-4 py-8 rounded-xl bg-white shadow-xl transition-all duration-500 ease-in-out transform hover:scale-105"
          >
            <h2 className="font-bold text-lg text-gray-800 text-center">
              {user.name} {user.lastname}
            </h2>
            <p className="text-sm text-gray-600 text-center">{user.email}</p>
            <p className="text-sm text-gray-600 text-center">{user.country}</p>
            <p className="text-md font-semibold text-gray-800 text-center">
              Role: {user.role}
            </p>
            <p className="text-md font-semibold text-gray-800 text-center">
              Status: {user.isActive ? "Active" : "Inactive"}
            </p>
            <h3 className="font-bold text-md text-gray-800 mt-4 text-center">
              Orders:
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {user.orders.slice(0, 1).map((order: IOrdersFavorites) => (
                <li key={order.id} className="mb-2">
                  <p>Order ID: {order.id}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {order.date}</p>
                  <a
                    href={order.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Label
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-md text-gray-800 mt-4 text-center">
              Gift Cards:
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {user.giftcards?.slice(0, 1).map((giftcard: IGitfCards) => (
                <li key={giftcard.id} className="mb-2">
                  <p>Code: {giftcard.code}</p>
                  <p>
                    Discount:{" "}
                    {giftcard.discount ? `${giftcard.discount}%` : "N/A"}
                  </p>
                  <p>Status: {giftcard.isUsed ? "Used" : "Unused"}</p>
                  {giftcard.img && (
                    <img
                      src={giftcard.img}
                      alt="Giftcard Image"
                      className="w-16 h-16 object-cover mt-2"
                    />
                  )}
                </li>
              ))}
            </ul>
            <div className="flex justify-center items-center mt-4">
              <button
                className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold bg-yellow-600 hover:bg-yellow-900 hover:text-yellow-500 m-3 capitalize transition-all duration-400 ease-in-out transform hover:scale-105"
                onClick={(event) => handleEdit(event, user.id)}
              >
                Editar
              </button>
              <button
                className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold bg-red-500 hover:bg-red-900 hover:text-red-500 m-3 capitalize transition-all duration-400 ease-in-out transform hover:scale-105"
                onClick={() => handleButtonDelete(user.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
