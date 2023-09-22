import React from "react"
import styled from "styled-components"
const Header = () =>{
    return(
    <HeaderLayer>
    <Text>국내 모든 임상시험 검색하고</Text>
    <Text>온라인으로 참여하기</Text>
    </HeaderLayer>)
}

export default Header

const Text = styled.div`
font-size : 36px;
font-weight : bold;
text-align: center;
`
const HeaderLayer = styled.div`
margin-top : 30px;
`