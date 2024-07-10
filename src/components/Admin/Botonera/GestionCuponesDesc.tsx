import axios from "axios";
import React, { useEffect, useState } from "react";

export const GestionCuponesDesc = ({ signal, onCloseModal }: any) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [giftcardsState, setGiftcardsState] = useState<any[]>([]);
  signal;
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditState(!editState);
    setModalOpen(true); 
  };
  useEffect(() => {
    if (signal) {
      setModalOpen(true);
    }
  }, [signal]);

  const closeModal = () => {
    setModalOpen(false);
    onCloseModal(); // Llama a la función para cerrar el modal y actualizar signal en Admin
  };
  useEffect(() => {
    const getGiftcards = async () => {
      try {
        const response = await axios.get(
          "https://lachocoback.vercel.app/gitfcards"
        );
        const data = response.data;
        setGiftcardsState(data);
      } catch (error) {
        console.log(error);
      }
    };
    getGiftcards();
  }, []);

  return (
    <div className="w-full flex flex-wrap justify-center items-center px-4 py-8 gap-4">
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <form className="w-[500px] h-[300px] flex flex-col justify-evenly items-center  p-4 rounded-lg ">
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
          </div>
        </div>
      )}

      {giftcardsState.map((giftcard) => (
        <div
          key={giftcard.id}
          className="w-[300px] min-h-[350px] flex flex-col
          justify-evenly items-center bg-white p-4 
          rounded-xl shadow-xl hover:shadow-xl
          transition-all ease  
          hover:scale-105"
        >
          <h2 className="font-bold text-gray-800 text-center">
            Cupón ID: {giftcard.id}
          </h2>
          <p className="font-bold text-gray-800 text-center">
            Descuento: {giftcard.discount ? `${giftcard.discount}%` : "N/A"}
          </p>
          <p className="font-bold text-gray-800 text-center">
            Estado: {giftcard.isUsed ? "Usado" : "No usado"}
          </p>
          {giftcard.img && (
            <img
              src={giftcard.img}
              alt="Imagen del cupón"
              className="w-16 h-16 object-cover mt-2"
            />
          )}
          <div className="w-full flex justify-center items-center mt-4">
            <button
              className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold bg-yellow-500 hover:bg-yellow-600 hover:text-yellow-200 m-3 capitalize transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={handleEdit}
            >
              Editar
            </button>
            <button className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold bg-red-500 hover:bg-red-600 hover:text-red-200 m-3 capitalize transition-all duration-300 ease-in-out transform hover:scale-105">
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
