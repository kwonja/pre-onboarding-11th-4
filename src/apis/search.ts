import { api } from "./core"


export const getsearch = async(search : string) =>{
    const response = await api.get(`sick?q=${search}`)
    return response;
}