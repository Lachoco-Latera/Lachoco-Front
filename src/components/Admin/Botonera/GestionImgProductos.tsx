import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/images/logo.png";

export const GestionImgProductos = () => {
  const [editState, setEditState] = useState<boolean>(false);
  const [orderState, setOrderState] = useState<any[]>([]);

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditState(!editState);
  };

  const handleButtonDelete = (id: string) => {
    // Funcionalidad de eliminación aquí
    console.log(`Eliminar producto con id: ${id}`);
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
  console.log(orderState);
  return (
    <div className="w-full flex flex-row flex-wrap gap-4 px-4 py-8 justify-center items-center">
      {editState && (
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
      )}
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
  );
};
