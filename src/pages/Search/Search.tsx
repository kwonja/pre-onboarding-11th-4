import React, { useCallback, useState } from 'react';
import styled from "styled-components"
import { getsick } from '../../apis/search';
import SearchItem from './SearhItem';
import { Data } from '../../interface/Data';
import { ReactComponent as SearchIcon } from "../../svg/serachIcon.svg"
import GetDataFromCache from '../../utils/GetDataFromCache';
const EXPRIE_SECOND = 10;
const Search = () =>{
    const [datas,setDatas]=useState<Data[]>([]);

    const OnchangeHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        inputHandler(e.target.value)
    }
    const sendQuery =async (query : string) => {
        //key를 쿼리로 설정

        const cachedData = GetDataFromCache(query);
        if(cachedData)
        {
            setDatas(cachedData.datas)
            console.log(query)
        }
        else{
            try{
                console.log("api calling")
                const response = await getsick(query);
                if(response.data)
                {
                    const token ={
                        datas : response.data,
                        expire : Date.now() + EXPRIE_SECOND
                    }
                    localStorage.setItem(query,JSON.stringify(token))
                    setDatas(response.data)
                }
    
            }catch(err){
                console.log(err)
            }
        }
    }
    const debounce = (callback: (query: string) => Promise<void>,delay : number)=>{
        let timer : NodeJS.Timeout
        return function (query : string)
        {
            clearTimeout(timer)
            timer = setTimeout( ()=>{
                callback(query)
            },delay)
        }
    }
    const inputHandler = useCallback( debounce((input) => sendQuery(input), 500),[debounce]);
    return(
        <>
        
         <InputLayer>
                <InputParent>
                    <SearchIcon/> <Input onChange={OnchangeHandler}/>
                </InputParent>
                <Btn>검색</Btn>
        </InputLayer>

        <ItemLayer>
            <Text>추천검색어</Text>
        {datas.map( (data,id)=>(
            <SearchItem
            key={id}
            SearchItem={data}
            />
        ))}
        </ItemLayer>
        </>
        )

}

export default Search

const InputLayer = styled.div`
width : 90%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin : 0 auto;
margin-top : 30px;
box-sizing: border-box;
`

const InputParent = styled.div`
width : 85%;
height : 100px;
display: flex;
gap : 15px;
flex-direction: row;
background : white;
border-radius: 50px 0 0 50px;
box-sizing: border-box;
align-items: center;
padding : 50px;
border : none;
`
const Input = styled.input`
font-size : 30px;
border:none;
outline: none;
text-decoration : underline;
`
const Btn = styled.button`
width : 15%;
height : 100px;
color : white;
background-color: rgb(53,122,225);
border-radius:  0 50px 50px 0;
box-sizing: border-box;
border : none;
cursor : pointer;
`
const ItemLayer = styled.div`
width : 90%;
margin : 0 auto;
display: flex;
flex-direction: column;
gap : 15px;
margin-top : 30px;
background-color: white;
border-radius: 50px;
box-sizing: border-box;
padding : 50px;
`
const Text = styled.div`
color: rgb(198,200,203);
font-size : 24px;
`