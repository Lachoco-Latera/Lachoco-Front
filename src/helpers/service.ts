import axios from "axios"
import { IRedes } from "./type"

// ------------------------------------- GET REDES
export const getRedes = async () => {
    try {
        const res = await axios.get('https://lachoco.onrender.com/redes')
        // console.log(res.data, '<<<<<------ service get')
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const postRedes = async (data: IRedes) => {
    try {
        const res = await axios.post('https://lachoco.onrender.com/redes', data)
        console.log(res.data, '<<<<<<<<<<<<<<------ service post')
        return res.data
    } catch (error) {
        console.log(error)
    }
}