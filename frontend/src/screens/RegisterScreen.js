import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import LoaderAction from '../components/Loader/LoaderAction'
import FormContainer from '../components/FormContainer'
import { register } from '../action/userAction'
import styled from 'styled-components'
import InputComponent from '../components/Input/InputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'


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
  const [phoneNumber,setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameError, setNameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [phoneError,setPhoneError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [confirmPasswordError, setConfirmPasswordError] = useState(null)

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

  const handleChangePhone = (e) => {
    setPhoneNumber(e.target.value)
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
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!regexEmail.test(email)) {
      setEmailError('Email is invalid')
      return
    } else {
      setEmailError(null)
    }

    const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g

    if(!regexPhone.test(phoneNumber)){
      setPhoneError('Phone is invalid')
      return
    } else {
      setPhoneError(null)
    }

    if (password === '' || password.length < 6) {
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

    dispatch(register(name, email, password,phoneNumber))

  }

  return (
    <FormContainer>
      <ContainerPage>
        <TitlePage>Sign Up</TitlePage>
        {error && <Message variant='error'>{error}</Message>}
        {loading && <LoaderAction />}
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
          <Form.Group controlId='Phone' className="mt-3">

            <InputComponent label="Phone Number" className='w-100' name='phoneNumber' type='text' placeholder='Enter Your Phone Number' value={phoneNumber} onChange={handleChangePhone}>

            </InputComponent>
            {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
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
