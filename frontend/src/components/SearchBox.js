import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
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
        <Form style={{display:'flex'}} onSubmit={submitHandler} inline>
            <Form.Control type='text' name='q' onChange={e => setKeyword(e.target.value)} placeholder='Search Product' className='mr-sm-2 ml-sm-3'>
            </Form.Control>
            <Button type='submit' variant='outline-success' className='p-1'>Search</Button>
        </Form>
    )
}

export default SearchBox
