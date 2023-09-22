import React from "react"
import { Data } from "../../interface/Data"
import styled from "styled-components"

import { ReactComponent as SearchIcon } from "../../svg/serachIcon.svg"
interface Props{
    SearchItem : Data
}
const SearchItem :  React.FC<Props> = ({
    SearchItem : {sickNm}
})=>{

    return (
    <SearchItemLayer>
         <SearchIcon/> {sickNm}
    </SearchItemLayer>)
}

export default SearchItem


const SearchItemLayer = styled.div`
width : 100%;
font-size : 30px;
display : flex;
flex-direction: row;
gap : 15px;
align-items: center;
`