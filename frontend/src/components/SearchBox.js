import React,{useState} from 'react'
import styled from 'styled-components'
import InputComponent from './Input/InputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'
const FormContainer = styled.form`
    display:flex;
    flex-direction:row;
    max-width:650px;
    @media (max-width:502px){
        min-width:200px;
    }
`

const SearchBox = ({history}) => {
    const [keyword,setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
    return (
        <FormContainer onSubmit={submitHandler} inline="true">
            <InputComponent hiddenLabel={true} variant="filled" type='text' name='q' onChange={e => setKeyword(e.target.value)} placeholder='Search Product' className='mr-sm-2 ml-sm-3'>
            </InputComponent>
            <ButtonComponent type='submit' variant='outline-success' className='p-1'>Search</ButtonComponent>
        </FormContainer>
    )
}

export default SearchBox
