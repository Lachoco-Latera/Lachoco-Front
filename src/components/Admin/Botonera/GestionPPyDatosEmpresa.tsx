import React, { useState, useEffect } from "react";
import axios from "axios";
import { VITE_BASE_URL } from "@/config/envs";

export const GestionPPyDatosEmpresa = ({ signal, onCloseModal }: any) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (signal) {
      setModalOpen(true);
    }
  }, [signal]);

  const closeModal = () => {
    setModalOpen(false);
    onCloseModal();
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditState(!editState);
    setModalOpen(true);
  };

  return (
    <>
      <div className="w-full flex flex-wrap px-4 py-8 gap-4 justify-center items-center">
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
                action=""
                className="w-[500px] h-[300px] flex flex-col justify-evenly items-center  "
              >
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
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[300px] min-h-[350px] flex flex-col
          justify-evenly items-center bg-white p-4 
          rounded-xl shadow-xl hover:shadow-xl
          transition-all ease  
          hover:scale-105"
          >
            <h2 className="font-bold    text-center">Title: {product.name}</h2>
            <p className="font-bold    text-center">
              Description: {product.description}
            </p>
            <p className="font-bold    text-center">
              Price: {Number(product.price).toLocaleString()} {product.currency}
            </p>
            <p className="font-bold    text-center">
              Category: {product.category.name}
            </p>
            <p className="font-bold    text-center">Stock: {product.stock}</p>
            <div className="w-full flex justify-center items-center">
              <button
                className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold duration-1000 bg-yellow-600 hover:bg-yellow-900 hover:text-yellow-500 m-3 capitalize"
                onClick={handleEdit}
              >
                Editar
              </button>
              <button className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold duration-1000 bg-red-500 hover:bg-red-900 hover:text-red-500 m-3 capitalize">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
