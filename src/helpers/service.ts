import axios from "axios"
import { IFlavor, IRedes } from "./type"

// ------------------------------------- REDES
export const getRedes = async () => {
    try {
        const res = await axios.get('https://lachocoback.vercel.app/redes')
        // console.log(res.data, '<<<<<------ service get')
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const postRedes = async (data: IRedes) => {
    try {
        const res = await axios.post('https://lachocoback.vercel.app/redes', data)
        console.log(res.data, '<<<<<<<<<<<<<<------ service post')
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const putRedes = async (data: IRedes) => {
    try {
        // const res = await axios.put('', data)
        // console.log(res.data, '<<<<<<<<<<<<<<<<<<<<<<<------------ service put redes')
        // return res.data
        console.log(data)
        return( 'Data recibida: CORRECTAMENTE')
    } catch (error) {
        console.log(error)
    }
}

export const deleteRed = async (id: string | undefined) => {
    try {
        // const res = await axios.delete(`${id}`)
        // console.log(res.data, '<<<<<<<<<<<<<<<<<<<<<<<------------ service delete redes')
        // return res.data
        console.log(id)
        return( 'Elemento eliminado correctamente')
    } catch (error) {
        console.log(error)
    }
}

// ----------------------------------------------- F L A V O R S 
export const postFlavors = async (data: IFlavor) => {
    try {
        // const res = await axios.post('', data)
        // console.log(res.data)
        // return res.data
        console.log(data)
        return('Datos cargados exitosamente')
    } catch (error) {
        console.log(error)
    }
}

export const deleteFlavor = async (id: string | undefined) => {
    try {
        // const res = await axios.delete(`${id}`)
        // console.log(res.data)
        // return res.data
        console.log(id)
        return('Sabor eliminado correctamente')
    } catch (error) {
        console.log(error)
    }
}