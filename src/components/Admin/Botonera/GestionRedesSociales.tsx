import { getRedes, postRedes } from '../../../helpers/service'
import { IRedes } from '@/helpers/type'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const GestionRedesSociales = () => {
  const [editState, setEditState] = useState<boolean>(false)
  const [addState, setAddState] = useState<boolean>(false)
  const [formState, setFormState] = useState<IRedes>({
    url: '',
    img: ''
  })
  console.log(formState, '<<<<<<<----- form state')
  const [data, SetData] = useState<IRedes[]>([])

  useEffect(()=>{
    const dataGet = async () =>{
      try {
        const data = await getRedes()
      SetData(data)
      } catch (error) {
       console.log(error) 
      }
    }
    dataGet()
  }, [formState])

  const handleEdit = (event: React.MouseEvent) => {
    event.preventDefault()
    setEditState(!editState)
  }

  const handleAdd = (event: React.MouseEvent) => {
    event.preventDefault()
    setAddState(!addState)
  }

  const handleButtonDelete = () => {
    const deleteOrder = () => {
      try {
        Swal.fire({
          title: "Estas seguro?",
          text: "La red social seleccionada se borrara permanentemente!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: 'Cancelar',
          confirmButtonText: "Si, eliminar!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Eliminado",
              text: "La red social seleccionada fue eliminada.",
              icon: "success",
          confirmButtonColor: "#30d66a",
          confirmButtonText: "Aceptar"
            });
            //aca se llamaria al servicio que elimina
          }
        });
        
      } catch (error) {
        console.log(error)
      }
    }
    deleteOrder()
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      Swal.fire({
        title: "Confirmar",
        text: "Por favor confirme el envio del formulario.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: 'Cancelar',
        confirmButtonText: "Enviar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Éxito",
            text: "El formulario se envio correctamente.",
            icon: "success",
        confirmButtonColor: "#30d66a",
        confirmButtonText: "Aceptar"
          });
           //aca se llamaria al servicio que elimina
        }
      });
      
      const postForm = await postRedes(formState)
      console.log(postForm, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<---- PPPPPPP')
      setAddState(!addState)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <div className="w-full flex flex-col justify-center items-center">
      {
        addState === true ? ( 
        <form action="" onSubmit={handleOnSubmit} className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-lime-500">
          <h2>Agregar nueva red social</h2>
          <input type="text" placeholder="url" name='url' value={formState.url} onChange={handleOnChange}/>
          <input type="text" placeholder="img" name='img' value={formState.img} onChange={handleOnChange}/>
          <button className="w-2/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-green-500 hover:bg-green-900  hover:text-green-500 m-3 capitalize">Agregar</button>
        </form>) : (null)
      }
      {
        editState === true ? (<form action=""  className="w-[500px] h-[300px] flex flex-col justify-evenly items-center bg-lime-500">
          <h2>Editar red social</h2>
          <input type="text" placeholder="url" name='url' />
          <input type="text" placeholder="img" name='img' />
          <button className="w-2/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-green-500 hover:bg-green-900  hover:text-green-500 m-3 capitalize">Agregar</button>
        </form>) : (null)
      }
      <button className="w-1/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-yellow-600 hover:bg-yellow-900  hover:text-yellow-500 m-3 capitalize" onClick={handleAdd}>agregar</button>
      <div className='w-full flex justify-evenly items-center flex-wrap'>
        { data.length > 0 ? (data?.map((elem)=>{
        return(
          <div className="w-[300px] min-h-[350px] flex flex-col justify-evenly items-center bg-stone-500" key={elem.id}>
          <p className="font-bold text-amber-300 text-center">{elem.url}</p>
          <p className="font-bold text-amber-300 text-center">{elem.img}</p>
          
          <div className="w-full flex justify-center items-center">
            <button className="w-1/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-yellow-600 hover:bg-yellow-900  hover:text-yellow-500 m-3 capitalize" onClick={handleEdit}>editar</button>
            <button className="w-1/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-red-500 hover:bg-red-900  hover:text-red-500 m-3 capitalize" onClick={handleButtonDelete}>eliminar</button>
          </div>
        </div>
        )
          
        })) : (<button className="w-1/3 h-[40px] xl:text-xl text-white  p-1 block rounded-lg  font-semibold duration-1000 bg-yellow-600 hover:bg-yellow-900  hover:text-yellow-500 m-3 capitalize" onClick={handleAdd}>agregar</button>)
      }
      </div>
      
    </div>
    
    </>
  )
}
