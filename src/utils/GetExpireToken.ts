import { Data } from "../interface/Data";
const EXPRIE_SECOND = 30* 1000
const GetExpireToken = (datas : Data[]) =>{
    return{
        datas : datas,
        expire : Date.now() + EXPRIE_SECOND
    }
}

export default GetExpireToken