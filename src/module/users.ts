import { VITE_BASE_URL } from "@/config/envs"
import axios from "axios"

export const getUser = async () => {
  const response = await axios.get(`${VITE_BASE_URL}/users`)
  return response
}