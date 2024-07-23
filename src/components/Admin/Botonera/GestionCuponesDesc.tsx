import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import UploadWidget from "../../../components/UploadWidget";
import { IoMdClose } from "react-icons/io";
import tinyLogo from "../../../../public/images/tinyLogo.png";

export const GestionCuponesDesc = ({ signal, onCloseModal }: any) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [giftcardsState, setGiftcardsState] = useState<any[]>([]);
  const [usersState, setUsersState] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedGiftCard, setSelectedGiftCard] = useState<any>(null);
  const [formData, setFormData] = useState({
    discount: 0,
    img: "",
    userId: "",
  });

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
    console.log(giftcardsState);
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://lachocoback.vercel.app/users"
        );
        const data = response.data;
        setUsersState(data);
      } catch (error) {
        console.log(error);
      }
    };

    getGiftcards();
    getUsers();
  }, []);

  const handleEdit = (giftcard: any) => {
    setSelectedGiftCard(giftcard);
    setFormData({
      discount: Number(giftcard.discount) || 0,
      img: giftcard.img,
      userId: giftcard.user?.id || "", // Asigna el userId seleccionado
    });
    setEditState(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditState(false);
    onCloseModal(); // Llama a la función para cerrar el modal y actualizar signal en Admin
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          `https://lachocoback.vercel.app/gitfcards/${selectedGiftCard.id}`,
          updatedFormData
        );
        // Notificación de éxito
        toast.success("Gift card actualizada exitosamente");
        // Actualiza la lista de giftcards después de editar
        const response = await axios.get(
          "https://lachocoback.vercel.app/gitfcards"
        );
        setGiftcardsState(response.data);
        closeModal();
      } catch (error) {
        // Notificación de error
        toast.error("Error al actualizar la gift card");
        console.log(error);
      }
    } else {
      try {
        await axios.post(
          "https://lachocoback.vercel.app/gitfcards",
          updatedFormData
        );
        // Notificación de éxito
        toast.success("Gift card agregada exitosamente");
        // Actualiza la lista de giftcards después de agregar
        const response = await axios.get(
          "https://lachocoback.vercel.app/gitfcards"
        );
        setGiftcardsState(response.data);
        closeModal();
      } catch (error) {
        // Notificación de error
        toast.error("Error al agregar la gift card");
        console.log(error);
      }
    }
  };
  const handleDelete = async (giftcard: any) => {
    try {
      await axios.delete(
        `https://lachocoback.vercel.app/gitfcards/${giftcard?.id}`
      );
      // Notificación de éxito
      toast.success("Gift card eliminada exitosamente");
      // Actualiza la lista de giftcards después de eliminar
      const response = await axios.get(
        "https://lachocoback.vercel.app/gitfcards"
      );
      setGiftcardsState(response.data);
    } catch (error) {
      // Notificación de error
      toast.error("Error al eliminar la gift card");
      console.log(error);
    }
  };
  const handleOnUpload = (result: any) => {
    if (result && result.event === "success") {
      const uploadedImageUrl = result.info.secure_url;
      setFormData((prev) => ({
        ...prev,
        img: uploadedImageUrl,
      }));
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
            className="bg-white p-6 rounded-lg max-w-full md:max-w-[500px] mx-4 md:mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              className="w-full h-auto flex flex-col justify-evenly items-center p-4 rounded-lg"
              onSubmit={handleSubmit}
            >
              <input
                type="number"
                name="discount"
                value={formData.discount}
                placeholder="Descuento"
                className="p-2 border rounded-md mb-2 w-full"
                onChange={handleChange}
              />
              <div className="flex flex-col items-center w-full mb-2">
                <UploadWidget onUpload={handleOnUpload}>
                  {({ open }: any) => {
                    function handleOnClick(e: any) {
                      e.preventDefault();
                      open();
                    }
                    return (
                      <button
                        onClick={handleOnClick}
                        className="rounded-xl p-2 shadow-md hover:drop-shadow-xl hover:scale-105 transition-all ease hover:bg-rose-400 text:bg-blue-400 hover:text-white font-bold hover:cursor-pointer"
                      >
                        Cargar imágenes
                      </button>
                    );
                  }}
                </UploadWidget>
                {formData.img && (
                  <div className="relative p-2 mt-2 max-w-40 break-words">
                    <img
                      src={formData.img}
                      alt="Imagen del cupón"
                      className="w-20 h-20 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          img: "",
                        }))
                      }
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                    >
                      <IoMdClose size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div className="w-full mb-2">
                <select
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  className="p-2 border rounded-md w-full"
                >
                  <option value="">Seleccionar Usuario</option>
                  {usersState.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} {user.lastname} - {user.email}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full h-[40px] text-white p-1 block rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 m-3 capitalize transition-all duration-300 ease-in-out transform hover:scale-105"
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
          className="w-full sm:w-[300px] min-h-[350px] flex flex-col justify-evenly items-center bg-white p-4 rounded-xl shadow-xl hover:shadow-xl transition-all ease hover:scale-105"
        >
          <h2 className="font-bold text-gray-800 text-center text-sm sm:text-base">
            Cupón ID: {giftcard.id}
          </h2>
          <p className="font-bold text-gray-800 text-center text-sm sm:text-base">
            Descuento: {giftcard.discount ? `${giftcard.discount}%` : "N/A"}
          </p>
          <p className="font-bold text-gray-800 text-center text-sm sm:text-base">
            Estado: {giftcard.isUsed ? "Usado" : "No usado"}
          </p>
          <p className="font-bold text-gray-800 text-center text-sm sm:text-base">
            Cliente:
          </p>
          <span>
            {giftcard.user.email ? giftcard.user.email : "Usuario no asignado"}
          </span>
          {giftcard.img ? (
            <img
              src={giftcard.img}
              alt="Imagen del cupón"
              className="w-16 h-16 object-cover mt-2"
            />
          ) : (
            <img
              src={tinyLogo}
              alt="Imagen del cupón"
              className="w-16 h-16 object-cover mt-2"
            />
          )}
          <div className="w-full flex flex-col sm:flex-row justify-center items-center mt-4 gap-2">
            <button
              className="w-full sm:w-1/2 h-[40px] text-white p-1 block rounded-lg font-semibold bg-yellow-500 hover:bg-yellow-600 hover:text-yellow-200 m-1 capitalize transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={() => handleEdit(giftcard)}
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(giftcard)}
              className="w-full sm:w-1/2 h-[40px] text-white p-1 block rounded-lg font-semibold bg-red-500 hover:bg-red-600 hover:text-red-200 m-1 capitalize transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
