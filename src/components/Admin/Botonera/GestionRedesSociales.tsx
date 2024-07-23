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
  const [formState, setFormState] = useState<IRedes>({
    url: "",
    img: "",
  });
  const [data, setData] = useState<IRedes[]>([]);
  const [selectedRed, setSelectedRed] = useState<IRedes | any>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (signal) {
      setModalOpen(true);
    }
  }, [signal]);

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
  }, []);

  useEffect(() => {
    if (selectedRed) {
      setFormState(selectedRed);
    }
  }, [selectedRed]);

  const closeModal = () => {
    setModalOpen(false);
    onCloseModal();
  };

  const handleEdit = (red: IRedes) => {
    setSelectedRed(red);
    setEditState(true);
    setModalOpen(true);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      const alertId = toast("¿Deseas eliminar la red social seleccionada?", {
        duration: Infinity,
        action: {
          label: "Aceptar",
          onClick: async () => {
            toast.dismiss(alertId);
            try {
              await deleteRed(id);
              toast.success("La red social se eliminó correctamente", {
                duration: 5000,
              });
              const data = await getRedes();
              setData(data);
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
        duration: Infinity,
        action: {
          label: "Aceptar",
          onClick: async () => {
            toast.dismiss(alertId);
            try {
              await postRedes(formState);
              toast.success("La red social se agregó correctamente", {
                duration: 5000,
              });
              const data = await getRedes();
              setData(data);
              closeModal();
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
    if (!selectedRed) return;

    try {
      const alertId = toast("¿Deseas editar esta red social?", {
        duration: Infinity,
        action: {
          label: "Aceptar",
          onClick: async () => {
            toast.dismiss(alertId);
            try {
              console.log(formState);

              // Asegúrate de pasar el id correcto aquí
              await putRedes(selectedRed.id, formState);
              toast.success("La red social se actualizó correctamente", {
                duration: 5000,
              });
              const data = await getRedes();
              setData(data);
              closeModal();
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
              className="bg-white p-6 rounded-lg max-w-full md:max-w-[500px] mx-4 md:mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <form
                onSubmit={editState ? handleOnSubmitEdit : handleOnSubmit}
                className="w-full h-auto flex flex-col justify-evenly items-center p-4 rounded-lg"
              >
                <h2>
                  {editState ? "Editar red social" : "Agregar nueva red social"}
                </h2>
                <input
                  type="text"
                  placeholder="URL"
                  name="url"
                  value={formState.url}
                  onChange={handleOnChange}
                  className="p-2 border rounded-md mb-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Imagen"
                  name="img"
                  value={formState.img}
                  onChange={handleOnChange}
                  className="p-2 border rounded-md mb-2 w-full"
                />
                <button className="w-full h-[40px] text-white p-1 block rounded-lg font-semibold bg-green-500 hover:bg-green-600 m-3 capitalize transition-all duration-300 ease-in-out transform hover:scale-105">
                  {editState ? "Guardar Cambios" : "Agregar"}
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="w-full flex justify-evenly items-center flex-wrap px-4 py-8 gap-4">
          {data.length > 0
            ? data.map((elem) => (
                <div
                  className="w-full sm:w-[300px] min-h-[350px] flex flex-col justify-evenly items-center bg-white p-4 rounded-xl shadow-xl hover:shadow-xl transition-all ease hover:scale-105"
                  key={elem.id}
                >
                  <p className="flex font-bold text-amber-300 text-center">
                    {elem.url}
                  </p>
                  <p className="font-bold text-amber-300 text-center">
                    <img
                      src={elem.img}
                      alt=""
                      className="w-36 h-36 object-cover"
                    />
                  </p>
                  <div className="w-full flex justify-center items-center">
                    <button
                      className="w-1/2 h-[40px] text-white p-1 block rounded-2xl font-semibold bg-yellow-600 hover:bg-yellow-700 m-3 capitalize transition-all duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => handleEdit(elem)}
                    >
                      Editar
                    </button>
                    <button
                      className="w-1/2 h-[40px] text-white p-1 block rounded-2xl font-semibold bg-red-500 hover:bg-red-600 m-3 capitalize transition-all duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => handleDelete(elem.id)}
                    >
                      Eliminar
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
