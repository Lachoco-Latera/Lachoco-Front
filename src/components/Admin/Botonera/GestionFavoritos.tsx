import { IFavorites, IGitfCards, IOrdersFavorites } from "@/helpers/type";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const GestionFavoritos = ({ signal }: any) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [userState, setUserState] = useState<IFavorites[]>([]);
  signal;

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditState(!editState);
  };

  const handleButtonDelete = (id: string | undefined) => {
    // Funcionalidad de eliminación aquí
    console.log(`Eliminar usuario con id: ${id}`);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://lachocoback.vercel.app/users"
        );
        const data = response.data;
        console.log(data, "<<<<<<<<<<<<<<<<<----- data getUser FAV");
        setUserState(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="w-full flex flex-row flex-wrap gap-4 px-4 py-8 justify-center items-center">
      {editState && (
        <form className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-lime-500 p-4 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="probando123"
            className="p-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="probando123"
            className="p-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="probando123"
            className="p-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="probando123"
            className="p-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="probando123"
            className="p-2 border rounded-md mb-2"
          />
        </form>
      )}
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
              onClick={handleEdit}
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
  );
};
