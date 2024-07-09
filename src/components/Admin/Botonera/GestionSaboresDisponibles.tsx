import React, { useEffect, useState } from "react";
import axios from "axios";
import { IFlavor } from "../../../helpers/type";
import { deleteFlavor, postFlavors } from "../../../helpers/service";
import { toast } from 'sonner';

export const GestionSaboresDisponibles = () => {
  const [editState, setEditState] = useState<boolean>(false);
  const [addState, setAddState] = useState<boolean>(false);

  const [flavorState, setFlavorState] = useState<IFlavor>({
    name: "",
    stock: 0,
  });
  const [flavors, setFlavors] = useState<IFlavor[]>([]);
  const [formEditState, setFormEditState] = useState<IFlavor>({
    name: "",
    stock: 0,
  })

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

  const handleAdd = (event: React.MouseEvent) => {
    event.preventDefault()
    setAddState(!addState)
  }

  const handleOnChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setFormEditState({
      ...formEditState,
      [name]: value
    })
  } 

  const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const alertId = toast('¿Deseas editar el sabor seleccionado?', {
        duration: 5000, // Mantiene la alerta abierta hasta que se haga clic en un botón
        action: {
          label: 'Aceptar',
          onClick: async () => {
            toast.dismiss(alertId);
            try {
              const postBack = await postFlavors(flavorState)
              console.log(postBack)
            } catch (error) {
              console.log(error);
            }
          },
        },
      }); 
    } catch (error) {
      console.log(error);
    }
  }

  const handleButtonDelete = (id: string | undefined) => {
    id;
    const deleteF = async () => {
      try {
        const alertId = toast('¿Deseas eliminar el sabor seleccionado?', {
          duration: 5000, // Mantiene la alerta abierta hasta que se haga clic en un botón
          action: {
            label: 'Aceptar',
            onClick: async () => {
              toast.dismiss(alertId);
              try {
                const deleteBack = await deleteFlavor(id)
                console.log(deleteBack)
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
    deleteF();
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
        const alertId = toast('¿Deseas agregar este nuevo sabor?', {
          duration: 5000, // Mantiene la alerta abierta hasta que se haga clic en un botón
          action: {
            label: 'Aceptar',
            onClick: async () => {
              toast.dismiss(alertId);
              try {
                const postBack = await postFlavors(flavorState)
                console.log(postBack)
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
    CreateFlavor();
  };

  return (
    <>
      <div className="w-full flex flex-row flex-wrap gap-4 px-4 py-8 justify-center items-center">
        {addState === true ? (
          <form
            action=""
            onSubmit={handleOnSubmit}
            className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-lime-500"
          >
            <h2>Agregar nuevo sabor</h2>
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
              Agregar
            </button>
          </form>
        ) : null}

        {
          editState ? (<form action="" onSubmit={handleSubmitEdit} className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-lime-500">
            <h2>Editar sabor seleccionado</h2>
            <input type="text" placeholder="Name" name="name" value={formEditState.name} onChange={handleOnChangeEdit}/>
            <input type="number" placeholder="Stock" name="stock" value={formEditState.stock} onChange={handleOnChangeEdit}/>
            <button className="w-2/3 h-[40px] xl:text-xl text-white p-1 block rounded-2xl font-semibold duration-400 bg-green-500 hover:bg-green-900 hover:text-green-500 m-3 capitalize hover:scale-105 transition-all ease" >Guardar Cambios</button>
          </form>) : (null)
        }
        
        {flavors.length < 0 ? (<button
          className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold duration-400 bg-yellow-600 hover:bg-yellow-900 hover:text-yellow-500 m-3 capitalize"
          onClick={handleAdd}>agregar</button>) : (flavors.map((flavor) => (
          <div
            key={flavor.id}
            className="w-[300px] min-h-[350px] flex flex-col
             justify-evenly px-4 rounded-xl 
             bg-white shadow-xl hover:shadow-xl
              transition-all ease  
              hover:scale-105"
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
                onClick={() => handleButtonDelete(flavor.id || undefined)}
              >
                Eliminar
              </button>
            </div>
          </div>
        )))}
      </div>
    </>
  );
};
