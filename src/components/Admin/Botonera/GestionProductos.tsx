import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/images/logo.png";
import UploadWidget from "../../../components/UploadWidget";

export const GestionProductos = ({ signal, onCloseModal }: any) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [orderState, setOrderState] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();
  const [formEditState, setFormEditState] = useState<any>({
    name: "",
    presentacion: 0,
    description: "",
    price: 0.0,
    currency: "USD",
    flavors: [],
    images: [
      "https://res.cloudinary.com/drtxikwww/image/upload/fl_preserve_transparency/v1719274387/example4_hm9wfy.jpg?_s=public-apps",
      "https://res.cloudinary.com/drtxikwww/image/upload/fl_preserve_transparency/v1719274387/example4_hm9wfy.jpg?_s=public-apps",
      "https://res.cloudinary.com/drtxikwww/image/upload/fl_preserve_transparency/v1719274387/example4_hm9wfy.jpg?_s=public-apps",
    ],
    categoryId: "11454ea8-a9d6-4798-bcfd-a2bfb9c59f74", // Aquí debes asignar la categoría correspondiente
  });
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

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormEditState({
      ...formEditState,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lachocoback.vercel.app/products",
        formEditState
      );
      console.log("Producto creado:", response.data);
      // Aquí podrías añadir lógica para manejar la respuesta, como actualizar la lista de productos
      closeModal(); // Cerrar el modal después de enviar el formulario
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          "https://lachocoback.vercel.app/products"
        );
        const data = response.data;
        setOrderState(data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);
  const handleButtonDelete = (id: string) => {
    // Funcionalidad de eliminación aquí
    console.log(`Eliminar producto con id: ${id}`);
  };
  function handleOnUpload(error: any, result: any, widget: any) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  }
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
            <form
              className="w-[500px] flex flex-col justify-evenly items-center"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre del producto"
                  className="p-2 border rounded-md"
                  value={formEditState.name}
                  onChange={handleInputChange}
                />
                <p className="self-start font-semibold drop-shadow">
                  Presentación / Cantidad de productos
                </p>
                <input
                  type="number"
                  name="presentacion"
                  placeholder="Presentación"
                  className="p-2 border rounded-md"
                  value={formEditState.presentacion}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  placeholder="Descripción"
                  className="p-2 border rounded-md"
                  value={formEditState.description}
                  onChange={handleInputChange}
                />
                <div className="self-center">
                  <UploadWidget onUpload={handleOnUpload}>
                    {({ open }: any) => {
                      function handleOnClick(e: any) {
                        e.preventDefault();
                        open();
                      }
                      return (
                        <button
                          onClick={handleOnClick}
                          className="rounded-xl p-2 shadow-md hover:drop-shadow-xl 
                          hover:scale-105 transition all ease  hover:bg-blue-400 
                          text:bg-blue-400 hover:text-white font-bold hover:cursor-pointer
                          "
                        >
                          Cargar imágenes
                        </button>
                      );
                    }}
                  </UploadWidget>

                  {error && <p>{error}</p>}

                  {url && (
                    <>
                      {" "}
                      <div className="flex flex-row justify-center items-center">
                        <p className="p-2">
                          <img
                            src={url}
                            alt="Uploaded resource"
                            className="w-20 h-20"
                          />
                        </p>
                        <p className="break-all max-w-[400px]">{url}</p>
                      </div>{" "}
                      <div className="flex flex-row justify-center items-center">
                        <p className="p-2">
                          <img
                            src={url}
                            alt="Uploaded resource"
                            className="w-20 h-20"
                          />
                        </p>
                        <p className="break-all max-w-[400px]">{url}</p>
                      </div>{" "}
                      <div className="flex flex-row justify-center items-center">
                        <p className="p-2">
                          <img
                            src={url}
                            alt="Uploaded resource"
                            className="w-20 h-20"
                          />
                        </p>
                        <p className="break-all max-w-[400px]">{url}</p>
                      </div>
                    </>
                  )}
                </div>
                <p className="self-start font-semibold drop-shadow">
                  Precio {"(En euros)"}
                </p>
                <input
                  type="number"
                  name="price"
                  placeholder="Precio"
                  className="p-2 border rounded-md"
                  value={formEditState.price}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="rounded-xl p-2 shadow-md hover:drop-shadow-xl 
                          hover:scale-105 transition all ease  hover:bg-blue-500 
                          text:bg-blue-400 hover:text-white font-bold hover:cursor-pointer"
                >
                  Crear Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="w-full flex flex-row flex-wrap gap-4 px-4 py-8 justify-center items-center">
        {orderState.map((order) => (
          <div
            key={order.id}
            className="w-[300px] min-h-[350px] flex flex-col justify-evenly px-4 py-4 rounded-xl bg-white shadow-xl transition-all duration-500 ease-in-out transform hover:scale-105"
          >
            <h2 className="font-bold text-lg text-gray-800 text-center">
              {order.name}
            </h2>
            {order.images.length > 0 ? (
              <div className=" self-center">
                <img src={order.images[0].img} alt="" className="w-36" />
              </div>
            ) : (
              <div className=" self-center">
                <img src={logo} alt="" className="w-36" />
              </div>
            )}
            <p className="text-sm text-gray-600 text-center">
              {order.description}
            </p>
            <p className="text-lg font-bold text-green-700 text-center">
              ${order.price} {order.currency}
            </p>
            <p className="text-md font-semibold text-gray-800 text-center">
              {order.category.name}
            </p>
            <p className="text-sm font-semibold text-gray-600 text-center">
              Stock:{" "}
              {order.flavors.reduce(
                (acc: any, flavor: any) => acc + flavor.stock,
                0
              )}
            </p>
            <div className="flex justify-center items-center mt-4">
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
