import { IFlavor } from "@/helpers/type"
import React, {  useState } from "react"

export const GestionSaboresDisponibles = () => {
  const [editState, setEditState] = useState<boolean>(false)
  const [flavorState, setFlavorState] = useState<IFlavor>({
    name: '',
    stock: 0,
  })
  console.log(flavorState, '<<<<<<<<<<<<<-------- FLAVOR STATE')

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault
    setEditState(!editState)
  }

 

  const handleButtonDelete = () => {
    const deleteOrder = () => {
      try {
        const data = 'sabor eliminado correctamente'
        alert(data)
      } catch (error) {
        console.log(error)
      }
    }
    deleteOrder()
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target 
    setFlavorState({
      ...flavorState,
      [name]: value,
    })
  }

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const CreateFlavor = async () => {
      try {
        const postForm = {
          name: 'Chocolate',
        } //await postBack({flavorState})
        alert('sabor: '+{postForm} +' correctamente')
        setFlavorState({
          name:'',
          stock:0,
        })
      } catch (error) {
        console.log(error)
      }
    } 
    CreateFlavor()
  }

  return (
    <>
    <div className="w-full flex flex-col justify-center items-center">
      {
        editState === true ? ( 
        <form action="" onSubmit={handleOnSubmit} className="w-[400px] h-[200px] flex flex-col justify-evenly items-center bg-lime-500">
          <input type="text" placeholder="Name" name="name" value={flavorState.name} onChange={handleOnChange}/>
          <input type="number" placeholder="stock" value={flavorState.stock} onChange={handleOnChange}/>
          <button className="w-2/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-green-500 hover:bg-green-900  hover:text-green-500 m-3 capitalize">Guardar Cambios</button>
        </form>) : (null)
      }
       

        <div className="w-[300px] min-h-[350px] flex flex-col justify-evenly items-center bg-stone-500">
          <h2 className="font-bold text-amber-300 text-center">title</h2>
          <p className="font-bold text-amber-300 text-center">description</p>
          <p className="font-bold text-amber-300 text-center">price</p>
          <p className="font-bold text-amber-300 text-center">categorie</p>
          <p className="font-bold text-amber-300 text-center">stock</p>
          <div className="w-full flex justify-center items-center">
            <button className="w-1/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-yellow-600 hover:bg-yellow-900  hover:text-yellow-500 m-3 capitalize" onClick={handleEdit}>editar</button>
            <button className="w-1/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-red-500 hover:bg-red-900  hover:text-red-500 m-3 capitalize" onClick={handleButtonDelete}>eliminar</button>
          </div>
        </div>
    </div>
    
    </>
  )
}
