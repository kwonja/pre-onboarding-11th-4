import { api } from "./core"


export const getsick = async(search : string) =>{
    const response = await api.get(`sick?q=${search}`)
    return response;
}