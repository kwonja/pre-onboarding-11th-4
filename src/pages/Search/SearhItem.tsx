import React from "react"
import { Data } from "../../interface/Data"
import styled from "styled-components"

import { ReactComponent as SearchIcon } from "../../svg/serachIcon.svg"
interface Props{
    SearchItem : Data,
    focus : boolean
}
const SearchItem :  React.FC<Props> = ({
    SearchItem : {sickNm},
    focus
})=>{

    return (
    <SearchItemLayer $focus={focus}>
         <SearchIcon/> {sickNm}
    </SearchItemLayer>)
}

export default SearchItem


const SearchItemLayer = styled.div<{ $focus?: boolean }>`
width : 100%;
font-size : 30px;
display : flex;
flex-direction: row;
gap : 15px;
align-items: center;
border-left :${props=> (props.$focus ? "5px solid #357AE1;" : "5px solid white;")}
background-color : ${props=> (props.$focus ? "#E9E9EA;" : null)}
box-sizing : border-box;
`