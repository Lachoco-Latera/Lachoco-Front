import axios from "axios";
import React, { useEffect, useState } from "react";

export const GestionCuponesDesc = ({ signal, onCloseModal }: any) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [giftcardsState, setGiftcardsState] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedGiftCard, setSelectedGiftCard] = useState<any>(null);
  const [formData, setFormData] = useState({
    discount: 0,
    img: "",
    userId: "",
  });
  const [users, setUsers] = useState<any[]>([]); // Estado para almacenar usuarios
  const [selectedUser, setSelectedUser] = useState<any>(null); // Estado para almacenar usuario seleccionado

  useEffect(() => {
    if (signal) {
      setModalOpen(true);
      setEditState(false); // Resetea el estado para mostrar formulario de agregar
      setFormData({
        discount: 0,
        img: "",
        userId: "",
      }); // Limpia el formulario
    }
  }, [signal]);

  useEffect(() => {
    const getGiftcards = async () => {
      try {
        const response = await axios.get("http://localhost:3000/gitfcards");
        const data = response.data;
        setGiftcardsState(data);
      } catch (error) {
        console.log(error);
      }
    };
    getGiftcards();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://lachocoback.vercel.app/users"
        );
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleEdit = (giftcard: any) => {
    setSelectedGiftCard(giftcard);
    setFormData({
      discount: Number(giftcard.discount) || 0,
      img: giftcard.img || "",
      userId: giftcard.user?.id || "",
    });
    setSelectedUser(giftcard.user || null); // Ajusta según el formato de tu objeto
    setEditState(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditState(false);
    onCloseModal(); // Llama a la función para cerrar el modal y actualizar signal en Admin
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    const user = users.find((user) => user.id === userId);
    setFormData((prev) => ({ ...prev, userId }));
    setSelectedUser(user || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      discount: Number(formData.discount),
    };

    if (editState && selectedGiftCard) {
      try {
        await axios.put(
          `http://localhost:3000/gitfcards/${selectedGiftCard.id}`,
          updatedFormData
        );
        // Actualiza la lista de giftcards después de editar
        const response = await axios.get(
          "https://lachocoback.vercel.app/gitfcards"
        );
        setGiftcardsState(response.data);
        closeModal();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post("http://localhost:3000/gitfcards", updatedFormData);
        // Actualiza la lista de giftcards después de agregar
        const response = await axios.get(
          "https://lachocoback.vercel.app/gitfcards"
        );
        setGiftcardsState(response.data);
        closeModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

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
            <form
              className="w-[500px] h-[300px] flex flex-col justify-evenly items-center p-4 rounded-lg"
              onSubmit={handleSubmit}
            >
              <input
                type="number"
                name="discount"
                min={1}
                max={100}
                value={formData.discount}
                placeholder="Descuento"
                className="p-2 border rounded-md mb-2 w-full md:w-3/4"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="img"
                value={formData.img}
                placeholder="URL de Imagen"
                className="p-2 border rounded-md mb-2 w-full md:w-3/4"
                onChange={handleChange}
              />
              <div className="w-full md:w-3/4 mb-2">
                <select
                  name="userId"
                  value={formData.userId}
                  onChange={handleUserChange}
                  className="p-2 border rounded-md w-full"
                  required
                >
                  <option value="">Seleccionar Usuario</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      "{user.name} {user.lastname}" - {user.email}
                    </option>
                  ))}
                </select>
                {selectedUser && (
                  <p className="mt-2 text-gray-700">
                    Seleccionado: {selectedUser.name} {selectedUser.lastname}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 m-3 capitalize transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {editState ? "Guardar Cambios" : "Agregar Nuevo"}
              </button>
            </form>
          </div>
        </div>
      )}

      {giftcardsState.map((giftcard) => (
        <div
          key={giftcard.id}
          className="w-[300px] min-h-[350px] flex flex-col justify-evenly items-center bg-white p-4 rounded-xl shadow-xl hover:shadow-xl transition-all ease hover:scale-105"
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
              onClick={() => handleEdit(giftcard)}
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
