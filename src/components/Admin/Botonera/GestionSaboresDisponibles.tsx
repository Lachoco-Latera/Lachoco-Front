import React, { useEffect, useState } from "react";
import axios from "axios";
import { IFlavor } from "../../../helpers/type";
import { toast } from "sonner";

export const GestionSaboresDisponibles = ({
  signal,
  deleteItem,
  onCloseModal,
}: any) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [flavorState, setFlavorState] = useState<IFlavor>({
    name: "",
    stock: 0,
  });
  const [flavors, setFlavors] = useState<IFlavor[]>([]);
  const [formEditState, setFormEditState] = useState<IFlavor>({
    name: "",
    stock: 0,
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (signal) {
      setModalOpen(true);
    }
    if (deleteItem) {
      console.log("mandar una peticion delete a /flavor/{id} para eliminarlo");
    }
  }, [signal, deleteItem]);

  const closeModal = () => {
    setModalOpen(false);
    onCloseModal(); // Llama a la función para cerrar el modal y actualizar signal en Admin
  };

  useEffect(() => {
    const getFlavors = async () => {
      try {
        const response = await axios.get(
          "https://lachocoback.vercel.app/flavor"
        );
        const data = response.data;
        setFlavors(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFlavors();
  }, []);

  const handleOnChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormEditState({ ...formEditState, [name]: value });
  };
  const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const alertId = toast("¿Deseas editar el sabor seleccionado?", {
        duration: 5000,
        action: {
          label: "Aceptar",
          onClick: async () => {
            toast.dismiss(alertId);
            try {
              const response = await axios.put(
                `https://lachocoback.vercel.app/flavor/${formEditState.id}`, // Verifica que esta URL sea correcta
                formEditState
              );

              setFlavors((prevFlavors) =>
                prevFlavors.map((flavor) =>
                  flavor.id === response.data.id ? response.data : flavor
                )
              );
              toast.success("Sabor editado exitosamente");
              setFormEditState({ name: "", stock: 0 });
              closeModal(); // Cierra el modal después de editar
            } catch (error) {
              console.log(error);
              toast.error("Error al editar el sabor");
            }
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonDelete = (id: string | undefined) => {
    const deleteF = async () => {
      try {
        const alertId = toast("¿Deseas eliminar el sabor seleccionado?", {
          duration: 5000,
          action: {
            label: "Aceptar",
            onClick: async () => {
              toast.dismiss(alertId);
              try {
                await axios.delete(
                  `https://lachocoback.vercel.app/flavor/${id}`
                );
                setFlavors((prevFlavors) =>
                  prevFlavors.filter((flavor) => flavor.id !== id)
                );
                toast.success("Sabor eliminado exitosamente");
              } catch (error) {
                console.log(error);
                toast.error("Error al eliminar el sabor");
              }
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    deleteF();
  };

  const handleButtonEdit = (flavor: IFlavor) => {
    setFormEditState(flavor);
    setEditState(true);
    setModalOpen(true);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFlavorState({ ...flavorState, [name]: value });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const createFlavor = async () => {
      try {
        const alertId = toast("¿Deseas agregar este nuevo sabor?", {
          duration: 5000,
          action: {
            label: "Aceptar",
            onClick: async () => {
              toast.dismiss(alertId);
              try {
                const response = await axios.post(
                  "https://lachocoback.vercel.app/flavor",
                  flavorState
                );
                setFlavors((prevFlavors) => [...prevFlavors, response.data]);
                toast.success("Sabor agregado exitosamente");
                setFlavorState({ name: "", stock: 0 });
                closeModal(); // Cierra el modal después de agregar
              } catch (error) {
                console.log(error);
                toast.error("Error al agregar el sabor");
              }
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    createFlavor();
  };

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
            {editState ? (
              <form
                onSubmit={handleSubmitEdit}
                className="w-[500px] h-[300px] flex flex-col justify-evenly items-center"
              >
                <h2 className="font-bold text-xl">Editar sabor seleccionado</h2>
                <input
                  type="text"
                  placeholder="Nombre del sabor"
                  name="name"
                  value={formEditState.name}
                  onChange={handleOnChangeEdit}
                  className="p-2 border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  name="stock"
                  min={0}
                  value={formEditState.stock}
                  onChange={handleOnChangeEdit}
                  className="p-2 border rounded-md"
                />
                <button
                  type="submit"
                  className="w-2/3 h-[40px] xl:text-xl 
                text-white p-1 block rounded-2xl font-semibold 
                duration-400 bg-green-500 hover:bg-green-900
                 hover:text-green-500 m-3 capitalize hover:scale-105 transition-all ease"
                >
                  Guardar Cambios
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleOnSubmit}
                className="w-[500px] h-[300px] flex flex-col justify-evenly items-center"
              >
                <h2 className="font-bold text-xl">Agregar nuevo sabor</h2>
                <input
                  type="text"
                  placeholder="Nombre del sabor"
                  name="name"
                  value={flavorState.name}
                  onChange={handleOnChange}
                  className="p-2 border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  name="stock"
                  min={0}
                  value={flavorState.stock}
                  onChange={handleOnChange}
                  className="p-2 border rounded-md"
                />
                <button className="w-2/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold duration-400 bg-green-500 hover:bg-green-900 hover:text-green-500 m-3 capitalize hover:scale-105 transition-all ease">
                  Agregar
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="w-full flex flex-row flex-wrap gap-4 px-4 py-8 justify-center items-center">
        {flavors.length > 0 &&
          flavors.map((flavor) => (
            <div
              key={flavor.id}
              className="w-[300px] min-h-[350px] flex flex-col justify-evenly px-4 rounded-xl bg-white shadow-xl hover:shadow-xl transition-all ease hover:scale-105"
            >
              <h2 className="font-bold">Sabor: {flavor.name}</h2>
              <p className="font-bold">Stock: {flavor.stock}</p>
              <div className="w-full flex justify-center items-center">
                <button
                  className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold duration-400 bg-red-500 hover:bg-red-900 hover:text-red-500 m-3 capitalize hover:scale-105 transition-all ease"
                  onClick={() => handleButtonDelete(flavor.id || undefined)}
                >
                  Eliminar
                </button>
                <button
                  className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold duration-400 bg-blue-500 hover:bg-blue-900 hover:text-blue-500 m-3 capitalize hover:scale-105 transition-all ease"
                  onClick={() => handleButtonEdit(flavor)}
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
