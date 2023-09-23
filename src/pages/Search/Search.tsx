import React, { useCallback, useState } from 'react';
import styled from "styled-components"
import { getsearch } from '../../apis/search';
import SearchItem from './SearhItem';
import { Data } from '../../interface/Data';
import { ReactComponent as SearchIcon } from "../../svg/serachIcon.svg"
import GetDataFromCache from '../../utils/GetDataFromCache';
import GetExpireToken from '../../utils/GetExpireToken';
import DeBounce from '../../hook/DeBounce';
const Search = () =>{
    const [datas,setDatas]=useState<Data[]>([]);
    const [isSearched,setisSearched]=useState<boolean>(false);
    const [noResult,setnoResult]=useState<boolean>(false);
    const [focusIdx, setFocusIdx] = useState<number>(-1);
    const [inputValue,setInputValue]=useState<string>("");

    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
		const searchLength = datas.length;
		if (e.key === 'ArrowDown') {
			searchLength > 0 && setFocusIdx((prev) => (prev + 1) % searchLength)
		}
		if (e.key === 'ArrowUp') {
			searchLength > 0  && focusIdx === -1 ? 
            setFocusIdx(searchLength-1) :
            setFocusIdx((prev) => (prev - 1 + searchLength) % searchLength)
		}
		if (e.key === 'Escape' || e.key ==='Backspace') {
			setFocusIdx(-1);
		}
		if (e.key === 'Enter') {
			searchLength > 0 && focusIdx >= 0 && setInputValue(datas[focusIdx].sickNm);
		}
	};

    const OnchangeHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setInputValue(e.target.value)
        debounceHandler(e.target.value)
    }
    const debounceHandler = useCallback(DeBounce((input) => sendQuery(input), 500),[]);

    const sendQuery =async (query : string) => {
    if(query !=="")
    {
        const cachedData = GetDataFromCache(query);
        if(cachedData)
        {
            console.log("useCached")
            setDatas(cachedData.datas)
            setnoResult(false)
        }
        else{
            try{
                console.log("api calling")
                const response = await getsearch(query);
                if(response.data.length > 0) //검색 결과가 존재할때
                {
                    const token = GetExpireToken(response.data)
                    localStorage.setItem(query,JSON.stringify(token))
                    setDatas(response.data)
                    setnoResult(false)
                } //검색결과가 존재하지 않을때
                else{
                    setnoResult(true)
                }
            }catch(err){
                console.log(err)
            }
        }
        setisSearched(true)
    }
    else setisSearched(false)
    }
    return(
        <>
        
         <InputLayer>
                <InputParent>
                    <SearchIcon/>
                    <Input
                    value={inputValue}
                    onChange={OnchangeHandler} 
                    onKeyDown={handleKeyDown }/>
                </InputParent>
                <Btn>검색</Btn>
        </InputLayer>
        {isSearched ? 
         noResult ? <ItemLayer><Text>검색결과를 찾지 못했습니다</Text></ItemLayer>  : 
         <ItemLayer>
         <Text>추천검색어</Text>
     {datas.map( (data,id)=>(
         <SearchItem
         key={id}
         SearchItem={data}
         focus={id===focusIdx}
         />
     ))}
     </ItemLayer>
    : null}
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
width : 100%
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