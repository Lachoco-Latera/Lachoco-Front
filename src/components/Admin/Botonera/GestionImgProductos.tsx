import React, { useState } from "react";

export const GestionImgProductos = () => {
  const [editState, setEditState] = useState<boolean>(false);

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault;
    setEditState(!editState);
  };
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        {editState === true ? (
          <form
            action=""
            className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-lime-500"
          >
            <input type="text" placeholder="probando123" />
            <input type="text" placeholder="probando123" />
            <input type="text" placeholder="probando123" />
            <input type="text" placeholder="probando123" />
            <input type="text" placeholder="probando123" />
          </form>
        ) : null}

        <div className="w-[300px] min-h-[350px] flex flex-col justify-evenly items-center bg-stone-500">
          <h2 className="font-bold text-amber-300 text-center">title</h2>
          <p className="font-bold text-amber-300 text-center">description</p>
          <p className="font-bold text-amber-300 text-center">price</p>
          <p className="font-bold text-amber-300 text-center">categorie</p>
          <p className="font-bold text-amber-300 text-center">stock</p>
          <div className="w-full flex justify-center items-center">
            <button
              className="w-1/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-yellow-600 hover:bg-yellow-900  hover:text-yellow-500 m-3 capitalize"
              onClick={handleEdit}
            >
              editar
            </button>
            <button className="w-1/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-red-500 hover:bg-red-900  hover:text-red-500 m-3 capitalize">
              eliminar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
