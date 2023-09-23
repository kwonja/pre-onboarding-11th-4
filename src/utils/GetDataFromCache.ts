const GetDataFromCache = (key : string) =>{
    const cacheData = localStorage.getItem(key)

    if(cacheData)
    {
        if(JSON.parse(cacheData).expire > Date.now()) return JSON.parse(cacheData)
        else
        {
            localStorage.removeItem(key)
            return null //캐쉬를 지우고 null 반환
        }
    }
    else return null //캐쉬가 없으면 null 반환
}
export default GetDataFromCache