import React from 'react'
import styled from 'styled-components'
const InputComponent = styled.input`
    min-width:250px;
    font-size:16px;
    padding:14px 7px;
    border:1px solid #ccc;
    color:black;
    border-radius:5px;
    &:hover{
        border-color:black
    };
    &:focus{
        border: 2px solid #1976D2;
        outline:none
    }
`
export default InputComponent
