const DeBounce = (callback: (query: string) => Promise<void>,delay : number) =>{
    let timer : NodeJS.Timeout
        return function (query : string)
        {
            clearTimeout(timer)
            timer = setTimeout( ()=>{
                callback(query)
            },delay)
        }
}
export default DeBounce