import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader/Loader'
import { getUserDetails, updateUserProfile } from '../action/userAction'
import { listMyOrders } from '../action/orderAction'
import InputComponent from '../components/Input/InputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'
import styled from 'styled-components'
import { toast } from 'react-toastify';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Meta from '../components/Meta'
import LoaderAction from '../components/Loader/LoaderAction'


const TitleInfo = styled.h3`
  text-align:center
`

const Wrapper = styled.div`
  padding:16px;
  -webkit-box-shadow: 5px 5px 7px 6px rgba(0,0,0,0.22); 
  ox-shadow: 5px 5px 7px 6px rgba(0,0,0,0.22);
  border:0;
  border-radius:10px
`
const ThComponent = styled.th`
  text-align:center;
  vertical-align:middle !important;
  padding:16px 12px !important;
`

const TdContainer = styled.td`
  text-align:center;
  vertical-align:middle !important
`

const ProfileScreen = ({ location, history }) => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const dispatch = useDispatch()

  const userDetail = useSelector(state => state.userDetail)
  const { loading, error, user } = userDetail
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    return () => {
      if(history.action === 'POP'){
        history.replace('/')
      }
    }
  },[history])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
        setPhoneNumber(user.phoneNumber)
      }
    }
   
  }, [dispatch, history, userInfo, user, orders])

  const submitHandler = (e) => {
    e.preventDefault()
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
    if(password !== '' && password.length < 6) {
      return toast.error('Password must atleast 6 characters')
    }
    if (name === '' || !regexEmail.test(email) || !regexPhone.test(phoneNumber) || password !== confirmPassword) {
      return toast.error('Infomation update is invalid! please try again!')
    } else {
      dispatch(updateUserProfile({
        id: user._id,
        name, email, password,phoneNumber
      }))
    }

  }
  return (
    <>
      <Meta title='Profile' />
      <Row style={{ paddingTop: '32px' }}>
        <Col md={12}>
          <Wrapper>
            <TitleInfo>User Profile</TitleInfo>
            <Form onSubmit={submitHandler}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId='name'>
                    
                    <InputComponent className='w-100' label='name' type='name' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)}>

                    </InputComponent>
                  </Form.Group>
                  <Form.Group controlId='email' style={{ marginTop: '12px' }}>
                    
                    <InputComponent className='w-100' label='Email' type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}>
                    </InputComponent>
                  </Form.Group>
                  <Form.Group controlId='phoneNumber' style={{ marginTop: '12px' }}>
                    
                    <InputComponent className='w-100' label='Phone Number' type='text' placeholder='Enter Your Phone Number' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}>
                    </InputComponent>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId='password'>
                   
                    <InputComponent className='w-100' label='password' type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)}>

                    </InputComponent>
                  </Form.Group>
                  <Form.Group controlId='confirmPassword' style={{ marginTop: '12px' }}>
                   
                    <InputComponent className='w-100' label='Confirm Password' type='password' placeholder='Confirm password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}>

                    </InputComponent>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ justifyContent: 'center', paddingTop: '32px' }}>
                <ButtonComponent type='submit' variant='primary'>Update</ButtonComponent>
              </Row>
              {error && <Message variant='error'>{error}</Message>}
              {loading && <LoaderAction />}
            </Form>

          </Wrapper>
        </Col>
      </Row>
      <Row style={{ marginTop: '56px' }}>
        <Col md={12}>
          <Wrapper>
            <TitleInfo>
              Order
            </TitleInfo>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant='error'>{errorOrders}</Message> : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <ThComponent>ID</ThComponent>
                    <ThComponent>DATE</ThComponent>
                    <ThComponent>TOTAL</ThComponent>
                    <ThComponent>PAID</ThComponent>
                    <ThComponent>DELIVERED</ThComponent>
                    <ThComponent></ThComponent>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} style={{ background: 'white' }}>
                      <TdContainer>{order._id}</TdContainer>
                      <TdContainer>{order.createdAt.substring(0, 10)}</TdContainer>
                      <TdContainer>{order.totalPrice}</TdContainer>
                      <TdContainer>{order.isPaid ? order.paidAt.substring(0, 10) : (
                        <HighlightOffRoundedIcon sx={{color:'red'}}/>
                      )}</TdContainer>
                      <TdContainer>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                        <HighlightOffRoundedIcon sx={{color:'red'}}/>
                      )}</TdContainer>
                      <TdContainer>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className='btn-sm' variant='light'>Details</Button>
                        </LinkContainer>
                      </TdContainer>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Wrapper>
        </Col>
      </Row>
    </>
  )
}

export default ProfileScreen
