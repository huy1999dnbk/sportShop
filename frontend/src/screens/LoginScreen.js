import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { login } from '../action/userAction'

import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader/Loader'
import InputComponent from '../components/Input/InputComponent'
import styled from 'styled-components'
import ButtonComponent from '../components/Button/ButtonComponent'
import LoaderAction from '../components/Loader/LoaderAction'
const ContainerPage = styled.div`
  border:none;
  -webkit-box-shadow: 0px 10px 37px 1px #000000; 
  box-shadow: 0px 10px 37px 1px #000000;
  padding:18px;
  border-radius:10px;
`

const TitleLogin = styled.h1`
  text-align:center;

`
const FormLabel = styled.label`
  font-weight:bold;
  font-size:1rem;
  color:black;
  display:block
`

const ErrorMessage = styled.span`
  color:red;
  font-size:12px;
  font-weight:bold
`


const LoginScreen = ({ location, history }) => {
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!regex.test(email)) {
      setErrorEmail('Email is invalid, please try again!')
      return
    } else {
      setErrorEmail('')
    }
    if (password === '' || password.length < 6) {
      setErrorPassword('Password is not invalid, password must atleast 6 characters')
      return
    } else {
      setErrorPassword('')
    }
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <ContainerPage>
        <TitleLogin>Sign In</TitleLogin>
        {loading && <LoaderAction />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <InputComponent label="Email" className='w-100' type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}>
            </InputComponent>
            <ErrorMessage>{errorEmail}</ErrorMessage>
          </Form.Group>
          <Form.Group controlId='password' className='mt-3'>
            <InputComponent label="Password" className='w-100' type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)}>
            </InputComponent>
            <ErrorMessage>{errorPassword}</ErrorMessage>
          </Form.Group>
          <div className='mt-3' style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <ButtonComponent type='submit' variant='primary'>Sign In</ButtonComponent>
          </div>

        </Form>
        <Row className='py-3'>
          <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </Col>
        </Row>
      </ContainerPage>
    </FormContainer>
  )
}

export default LoginScreen
