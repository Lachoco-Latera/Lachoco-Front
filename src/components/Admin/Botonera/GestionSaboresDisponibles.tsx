import React, { useEffect, useState } from "react";
import axios from "axios";
import { IFlavor } from "@/helpers/type";

export const GestionSaboresDisponibles = () => {
  const [editState, setEditState] = useState<boolean>(false);
  const [flavorState, setFlavorState] = useState<IFlavor>({
    name: "",
    stock: 0,
  });
  const [flavors, setFlavors] = useState<IFlavor[]>([]);

  console.log(flavorState, "<<<<<<<<<<<<<-------- FLAVOR STATE");

  useEffect(() => {
    const getFlavors = async () => {
      try {
        const response = await axios.get(
          "https://lachocoback.vercel.app/flavor"
        );
        const data = response.data;
        console.log(data, "<<<<---------- data get flavors back");
        setFlavors(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFlavors();
  }, []);

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditState(!editState);
  };

  const handleButtonDelete = (id: string) => {
    id;
    const deleteFlavor = async () => {
      try {
        // Aquí se debería agregar la lógica para eliminar el sabor usando su ID
        const data = "sabor eliminado correctamente";
        alert(data);
      } catch (error) {
        console.log(error);
      }
    };
    deleteFlavor();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFlavorState({
      ...flavorState,
      [name]: value,
    });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const CreateFlavor = async () => {
      try {
        const postForm = {
          name: flavorState.name,
          stock: flavorState.stock,
        };
        // Aquí se debería agregar la lógica para crear un nuevo sabor
        alert("sabor creado correctamente");
        setFlavorState({
          name: "",
          stock: 0,
        });
      } catch (error) {
        console.log(error);
      }
    };
    CreateFlavor();
  };

  return (
    <>
      <div className="w-full flex flex-row flex-wrap gap-4 p-2 justify-center items-center">
        {editState === true ? (
          <form
            action=""
            onSubmit={handleOnSubmit}
            className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-lime-500"
          >
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={flavorState.name}
              onChange={handleOnChange}
            />
            <input
              type="number"
              placeholder="Stock"
              name="stock"
              value={flavorState.stock}
              onChange={handleOnChange}
            />
            <button className="w-2/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold duration-400 bg-green-500 hover:bg-green-900 hover:text-green-500 m-3 capitalize hover:scale-105 transition-all ease">
              Guardar Cambios
            </button>
          </form>
        ) : null}

        {flavors.map((flavor) => (
          <div
            key={flavor.id}
            className="w-[300px] min-h-[350px] flex flex-col justify-evenly px-4 rounded-xl bg-white shadow-xl"
          >
            <h2 className="font-bold ">Sabor: {flavor.name}</h2>
            <p className="font-bold ">Stock: {flavor.stock}</p>
            <div className="w-full flex justify-center items-center">
              <button
                className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold duration-400 bg-yellow-600 hover:bg-yellow-900 hover:text-yellow-500 m-3 capitalize hover:scale-105 transition-all ease"
                onClick={handleEdit}
              >
                Editar
              </button>
              <button
                className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold duration-400 bg-red-500 hover:bg-red-900 hover:text-red-500 m-3 capitalize hover:scale-105 transition-all ease"
                onClick={() => handleButtonDelete(flavor.id || "")}
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
