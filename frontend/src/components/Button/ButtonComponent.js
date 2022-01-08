import React from 'react'
import styled from 'styled-components'

const ButtonComponent = styled.button`
    padding: ${props => props.customPad || '13px'};
    background: ${props => props.bgDark ? 'black' : 'white'};
    border: 1px solid black;
    border-radius: 5px;
    color:${props => props.bgDark ? 'white' : 'black'};
    &:hover{
        background: ${props => props.bgDark ? 'white' : 'black'};
        color: ${props => props.bgDark ? 'black' : 'white'};
        border-color: ${props => props.bgDark ? 'black' : 'white'};
    }
`

export default ButtonComponent
