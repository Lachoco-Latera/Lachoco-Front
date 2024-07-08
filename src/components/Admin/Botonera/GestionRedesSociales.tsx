import { getRedes, postRedes } from "../../../helpers/service";
import { IRedes } from "@/helpers/type";
import React, { useEffect, useState } from "react";

export const GestionRedesSociales = () => {
  const [editState, setEditState] = useState<boolean>(false);
  const [addState, setAddState] = useState<boolean>(false);
  const [formState, setFormState] = useState<IRedes>({
    url: "",
    img: "",
  });
  console.log(formState, "<<<<<<<----- form state");
  const [data, setData] = useState<IRedes[]>([]);

  useEffect(() => {
    const dataGet = async () => {
      try {
        const data = await getRedes();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    dataGet();
  }, [formState]);

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditState(!editState);
  };

  const handleAdd = (event: React.MouseEvent) => {
    event.preventDefault();
    setAddState(!addState);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const postForm = await postRedes(formState);
      console.log(postForm, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<---- PPPPPPP");
      setAddState(!addState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        {addState === true ? (
          <form
            action=""
            onSubmit={handleOnSubmit}
            className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-lime-500"
          >
            <h2>Agregar nueva red social</h2>
            <input
              type="text"
              placeholder="url"
              name="url"
              value={formState.url}
              onChange={handleOnChange}
              className="w-2/3 p-2 rounded-md border-2 border-gray-300"
            />
            <input
              type="text"
              placeholder="img"
              name="img"
              value={formState.img}
              onChange={handleOnChange}
              className="w-2/3 p-2 rounded-md border-2 border-gray-300"
            />
            <button className="w-2/3 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold duration-400 bg-green-500 hover:bg-green-900 hover:text-green-500 m-3 capitalize">
              Agregar
            </button>
          </form>
        ) : null}
        {editState === true ? (
          <form
            action=""
            className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-lime-500"
          >
            <h2>Editar red social</h2>
            <input
              type="text"
              placeholder="url"
              name="url"
              className="w-2/3 p-2 rounded-md border-2 border-gray-300"
            />
            <input
              type="text"
              placeholder="img"
              name="img"
              className="w-2/3 p-2 rounded-md border-2 border-gray-300"
            />
            <button className="w-2/3 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold duration-400 bg-green-500 hover:bg-green-900 hover:text-green-500 m-3 capitalize">
              Guardar Cambios
            </button>
          </form>
        ) : null}
        <div className="w-full flex justify-evenly items-center flex-wrap px-4 py-8 gap-4">
          {data.length > 0 ? (
            data.map((elem) => (
              <div
                className="w-[300px] min-h-[350px] flex flex-col
          justify-evenly items-center bg-white p-4 
          rounded-xl shadow-xl hover:shadow-xl
          transition-all ease  
          hover:scale-105"
                key={elem.id}
              >
                <p className="flex font-bold text-amber-300 text-center">
                  {elem.url}
                </p>
                <p className="font-bold text-amber-300 text-center">
                  <img src={elem.img} alt="" />
                </p>

                <div className="w-full flex justify-center items-center">
                  <button
                    className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold duration-400 bg-yellow-600 hover:bg-yellow-900 hover:text-yellow-500 m-3 capitalize hover:scale-105 transition-all ease"
                    onClick={handleEdit}
                  >
                    editar
                  </button>
                  <button className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold duration-400 bg-red-500 hover:bg-red-900 hover:text-red-500 m-3 capitalize hover:scale-105 transition-all ease">
                    eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <button
              className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold duration-400 bg-yellow-600 hover:bg-yellow-900 hover:text-yellow-500 m-3 capitalize"
              onClick={handleAdd}
            >
              agregar
            </button>
          )}
        </div>{" "}
        <button
          className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold duration-400 bg-yellow-600 hover:bg-yellow-900 hover:text-yellow-500 m-3 capitalize"
          onClick={handleAdd}
        >
          agregar
        </button>
      </div>
    </>
  );
};
