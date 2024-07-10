import {
  deleteRed,
  getRedes,
  postRedes,
  putRedes,
} from "../../../helpers/service";
import { IRedes } from "@/helpers/type";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const GestionRedesSociales = ({ signal, onCloseModal }: any) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [addState, setAddState] = useState<boolean>(false);
  const [formState, setFormState] = useState<IRedes>({
    url: "",
    img: "",
  });
  const [formEditState, setFormEditState] = useState<IRedes>({
    url: "",
    img: "",
  });
  const [data, setData] = useState<IRedes[]>([]);
  signal;
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
    setModalOpen(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const alertId: any = toast("Deceas editar esta red social?", {
      duration: 5000,
      action: {
        label: "Aceptar",
        onClick: () => {
          toast.dismiss(alertId), setEditState(!editState);
        },
      },
    });
  };

  // const handleAdd = (event: React.MouseEvent) => {
  //   event.preventDefault();
  //   setAddState(!addState);
  // };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleOnChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormEditState({
      ...formEditState,
      [name]: value,
    });
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      const alertId = toast("¿Deseas eliminar esta red social?", {
        duration: 5000, // Mantiene la alerta abierta hasta que se haga clic en un botón
        action: {
          label: "Aceptar",
          onClick: async () => {
            toast.dismiss(alertId);
            try {
              const cardDelete = await deleteRed(id);
              console.log(cardDelete);
            } catch (error) {
              console.log(error);
            }
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const alertId = toast("¿Deseas agregar esta red social?", {
        duration: Infinity, // Mantiene la alerta abierta hasta que se haga clic en un botón
        action: {
          label: "Aceptar",
          onClick: async () => {
            toast.dismiss(alertId);
            try {
              const postForm = await postRedes(formState);
              postForm;
              setAddState(!addState);
            } catch (error) {
              console.log(error);
            }
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmitEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const alertId = toast("¿Deseas editar esta red social?", {
        duration: Infinity, // Mantiene la alerta abierta hasta que se haga clic en un botón
        action: {
          label: "Aceptar",
          onClick: async () => {
            toast.dismiss(alertId);
            try {
              const putForm = await putRedes(formEditState);
              putForm;
            } catch (error) {
              console.log(error);
            }
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
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
            </div>{" "}
          </div>
        )}
        {editState === true ? (
          <form
            action=""
            className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-violet-300"
            onSubmit={handleOnSubmitEdit}
          >
            <h2>Editar red social</h2>
            <input
              type="text"
              placeholder="url"
              name="url"
              className="w-2/3 p-2 rounded-md border-2 border-gray-300"
              value={formEditState.url}
              onChange={handleOnChangeEdit}
            />
            <input
              type="text"
              placeholder="img"
              name="img"
              className="w-2/3 p-2 rounded-md border-2 border-gray-300"
              value={formEditState.img}
              onChange={handleOnChangeEdit}
            />
            <button className="w-2/3 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold duration-400 bg-green-500 hover:bg-green-900 hover:text-green-500 m-3 capitalize">
              Guardar Cambios
            </button>
          </form>
        ) : null}
        <div className="w-full flex justify-evenly items-center flex-wrap px-4 py-8 gap-4">
          {data.length > 0
            ? data.map((elem) => (
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
                    <button
                      className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold duration-400 bg-red-500 hover:bg-red-900 hover:text-red-500 m-3 capitalize hover:scale-105 transition-all ease"
                      onClick={() => handleDelete(elem.id)}
                    >
                      eliminar
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};
