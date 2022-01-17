import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader/Loader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormContainer from '../components/FormContainer'
import { register } from '../action/userAction'
import styled from 'styled-components'
import InputComponent from '../components/Input/InputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'
const LabelForm = styled.label`
  display:block;
  color:black;
  font-weight:bold
`

const ContainerPage = styled.div`
  -webkit-box-shadow: 3px 5px 15px 5px rgba(0,0,0,0.51); 
  box-shadow: 3px 5px 15px 5px rgba(0,0,0,0.51);
  padding:10px;
  border-radius:10px
`

const TitlePage = styled.h1`
  text-align:center;
  color:black
`

const ErrorMessage = styled.span`
  color:red;
  font-weight:bold;
`


const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameError, setNameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [confirmPasswordError, setConfirmPasswordError] = useState(null)

  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }


  const submitHandler = (e) => {
    e.preventDefault()
    if (name === '') {
      setNameError('name can not be blank')
      return
    } else {
      setNameError(null)
    }
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!regex.test(email)) {
      setEmailError('Email is invalid')
      return
    } else {
      setEmailError(null)
    }

    if (password === '' || password < 6) {
      setPasswordError('Password is invalid, password must atleast 6 characters')
      return
    } else {
      setPasswordError(null)
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError('Confirm password must match with password')
      return
    } else {
      setConfirmPasswordError(null)
    }
    //dispatch Login

    dispatch(register(name, email, password))

  }

  return (
    <FormContainer>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ContainerPage>
        <TitlePage>Sign Up</TitlePage>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>

            <InputComponent label="Name" className='w-100' name='name' type='name' placeholder='Enter name' value={name} onChange={handleChangeName}>
            </InputComponent>
            {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
          </Form.Group>
          <Form.Group controlId='email' className="mt-3">

            <InputComponent label="Email" className='w-100' name='email' type='email' placeholder='Enter email' value={email} onChange={handleChangeEmail}>

            </InputComponent>
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          </Form.Group>
          <Form.Group controlId='password' className="mt-3">

            <InputComponent label="Password" className='w-100' name='password' type='password' placeholder='Enter password' value={password} onChange={handleChangePassword}>
            </InputComponent>
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          </Form.Group>
          <Form.Group controlId='confirmPassword' className="mt-3">

            <InputComponent label="Confirm password" className='w-100' name='confirmPassword' type='password' placeholder='Confirm password' value={confirmPassword} onChange={handleChangeConfirmPassword}>
            </InputComponent>
            {confirmPasswordError && <ErrorMessage>{confirmPasswordError}</ErrorMessage>}
          </Form.Group>
          <Row className='mt-3' style={{ display: 'flex', justifyContent: 'center' }}>
            <ButtonComponent type='submit' variant='primary'>Register</ButtonComponent>
          </Row>

        </Form>
        <Row className='py-3'>
          <Col>
            Have an account?{' '} <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </ContainerPage>
    </FormContainer>
  )
}

export default RegisterScreen
