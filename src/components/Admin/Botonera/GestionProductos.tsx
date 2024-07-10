/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategories, IFlavor } from "@/helpers/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from 'sonner';

export const GestionProductos = () => {
  const [editState, setEditState] = useState<boolean>(false);
  const [addState, setAddState] = useState<boolean>(false);
  const [flavor, setFlavor] = useState<IFlavor[]>([])
  const [categories, setCategories] = useState<ICategories[]>([])
  const [orderState, setOrderState] = useState<any[]>([]);
  // console.log(orderState)
  const [idFormEdit, setIdFormEdit] = useState<string>()
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    category: '',
    currency: '',
    flavors: [] as string[],
    image: '',
    presentacion: 0,
    price: '',
    stock: 0,
  })
  const [editFormState, setEditFormState] = useState({
    name: '',
    description: '',
    category: '',
    currency: '',
    flavors: [] as string[],
    image: '',
    presentacion: 0,
    price: '',
    stock: 0,
  })
  console.log(formState)

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          "https://lachocoback.vercel.app/products"
        );
        const data = response.data;
        setOrderState(data);
        const res = await axios.get('https://lachoco.onrender.com/flavor')
        const dtaFlavor = res.data
        setFlavor(dtaFlavor)
        const getCategories = await axios.get('https://lachoco.onrender.com/category')
        const categories = getCategories.data
        setCategories(categories)
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const handleEdit = (event: React.MouseEvent, id:string, idProduct:string) => {
    event.preventDefault();
    setEditState(!editState);
    setEditFormState((prevState) => ({ ...prevState, category: id }));
    setIdFormEdit(idProduct)
    console.log(editFormState, 'editFormStateeditFormStateeditFormStateeditFormState')
  };

  const handleAdd = (event: React.MouseEvent) => {
    event.preventDefault()
    setAddState(!addState)
    console.log('boton agregar')
  }

  const handleButtonDelete = (id: string) => {
    try {
      const alertId = toast('¿Deseas borrar este producto?', {
        duration: 5000, // Mantiene la alerta abierta hasta que se haga clic en un botón
        action: {
          label: 'Aceptar',
          onClick: async () => {
            toast.dismiss(alertId);
            try {
              // ACA IRIA LA FUNCION BARA BORRAR EL PRODUCTO
              console.log(`Eliminar producto con id: ${id}`);
            } catch (error) {
              console.log(error);
            }
          },
        },
      });
    } catch (error) {
      console.log(error)
    }
    
  };

  const handleOnChangeEdit = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target
    setEditFormState({
      ...editFormState,
      [name]: value,
    })
  }

  const handleFlavorChangeEdit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setEditFormState((prevState) => ({
      ...prevState,
      flavors: [...prevState.flavors, value]
    }));
  };

  const handleOnSubmitEdit = (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const alertId = toast('¿Deseas editar este producto?', {
        duration: 5000, // Mantiene la alerta abierta hasta que se haga clic en un botón
        action: {
          label: 'Aceptar',
          onClick: async () => {
            toast.dismiss(alertId);
            try {
              // idFormEdit es el id de la card a editar, para hacer el put
              //aca iria la solicitud al back
              console.log('FORMULARIO SUBMIT EDIT ANDANDO..........', idFormEdit)
              console.log('FORMULARIO SUBMIT EDIT ANDANDO..........')
            } catch (error) {
              console.log(error);
            }
          },
        },
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChange = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target
    setFormState({...formState,
      [name]: value
    })
  }
  const handleFlavorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      flavors: [...prevState.flavors, value]
    }));
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const alertId = toast('¿Deseas agregar este producto?', {
        duration: 5000, // Mantiene la alerta abierta hasta que se haga clic en un botón
        action: {
          label: 'Aceptar',
          onClick: async () => {
            toast.dismiss(alertId);
            try {
              // ACA IRIA LA FUNCION PARA EL POST DEL FORMULARIO
              console.log('FORMULARIO SUBMIT ADD ANDANDO..........')
            } catch (error) {
              console.log(error);
            }
          },
        },
      });
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div className="w-full flex flex-row flex-wrap gap-4 px-4 py-8 justify-center items-center">
      {editState && (
        <form className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-lime-500" onSubmit={handleOnSubmitEdit}>
          <h2>Editar el producto seleccionado</h2>
          <input type="text" name="name" value={editFormState.name} onChange={handleOnChangeEdit}  placeholder="Name" className="p-2 border rounded-md"/>

          <input type="text" name="description" value={editFormState.description} onChange={handleOnChangeEdit}  placeholder="Description" className="p-2 border rounded-md"/>

          <input type="text" name="price" value={editFormState.price} onChange={handleOnChangeEdit}  placeholder="Price" className="p-2 border rounded-md"/>

          <input type="number" name="stock" value={editFormState.stock} onChange={handleOnChangeEdit}  placeholder="Stock" className="p-2 border rounded-md"/>

          <input type="file" name="image" value={editFormState.image} onChange={handleOnChangeEdit}  placeholder="Imagen" className="p-2 border rounded-md"/>

          <select name="currency" id="" value={editFormState.currency} onChange={handleOnChangeEdit}>
            <option value="">Seleccone la moneda</option>
            <option value="COP">COP</option>
            <option value="USD">USD</option>
          </select>

          <select name="flavor" id="" value={editFormState.flavors[0] || ''} onChange={handleFlavorChangeEdit}>
            <option value="">Seleccone el sabor</option>
            {
              flavor.length > 0 ? (
                flavor?.map((flavor)=>{
                  return(
                    <option value={flavor.id} key={flavor.id}>{flavor.name}</option>
                  )
                })
              ) : (null)
            }
          </select>
        
          <button className="w-2/3 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold duration-400 bg-green-500 hover:bg-green-900 hover:text-green-500 m-3 capitalize">
              Agregar
            </button>
        </form>
      )}
      {
        addState ? (
          <form className="w-[500px] h-[600px] flex flex-col justify-evenly items-center bg-violet-500" onSubmit={handleOnSubmit}>
            <h2>Agregar nuevo producto</h2>
          <input type="text" name="name" value={formState.name} onChange={handleOnChange}  placeholder="Name" className="p-2 border rounded-md"/>

          <input type="text" name="description" value={formState.description} onChange={handleOnChange}  placeholder="Description" className="p-2 border rounded-md"/>

          <input type="text" name="price" value={formState.price} onChange={handleOnChange}  placeholder="Price" className="p-2 border rounded-md"/>

          <input type="number" name="stock" value={formState.stock} onChange={handleOnChange}  placeholder="Stock" className="p-2 border rounded-md"/>

          <input type="file" name="image" value={formState.image} onChange={handleOnChange}  placeholder="Imagen" className="p-2 border rounded-md"/>

          <select name="currency" id="" value={formState.currency} onChange={handleOnChange}>
            <option value="">Seleccone la moneda</option>
            <option value="COP">COP</option>
            <option value="USD">USD</option>
          </select>

          <select name="category" id="" value={formState.category} onChange={handleOnChange}>
            <option value="">Seleccione una categoria</option>
            {
              categories.length > 0 ? (categories?.map((category)=>{
                return(
                  <option value={category.name} key={category.id}>{category.name}</option>
                )
              })) : (null)
            }
          </select>

          <select name="flavor" id="" value={formState.flavors[0] || ''} onChange={handleFlavorChange}>
            <option value="">Seleccone el sabor</option>
            {
              flavor.length > 0 ? (
                flavor?.map((flavor)=>{
                  return(
                    <option value={flavor.id} key={flavor.id}>{flavor.name}</option>
                  )
                })
              ) : (null)
            }
          </select>
        
          <button className="w-2/3 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold duration-400 bg-green-500 hover:bg-green-900 hover:text-green-500 m-3 capitalize">
              Agregar
            </button>
        </form>
        ) : (null)
      }
      <button className="w-1/3 h-[40px] xl:text-xl text-white p-1 block rounded-lg font-semibold duration-400 bg-yellow-600 hover:bg-yellow-900 hover:text-yellow-500 m-3 capitalize" onClick={handleAdd}>agregar</button>
      {orderState.map((order) => (
        <div
          key={order.id}
          className="w-[300px] min-h-[350px] flex flex-col justify-evenly px-4 py-4 rounded-xl bg-white shadow-xl transition-all duration-500 ease-in-out transform hover:scale-105"
        >
          <h2 className="font-bold text-lg text-gray-800 text-center">
            {order.name}
          </h2>
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
              onClick={(event) => handleEdit(event, order.category.id, order.id)}
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
