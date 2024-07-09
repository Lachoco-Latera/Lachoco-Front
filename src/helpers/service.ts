import axios from "axios"
import { IRedes } from "./type"

// ------------------------------------- GET REDES
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