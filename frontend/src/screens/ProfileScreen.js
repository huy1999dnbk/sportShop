import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader/Loader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserDetails, updateUserProfile } from '../action/userAction'
import { listMyOrders } from '../action/orderAction'
import InputComponent from '../components/Input/InputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'
import styled from 'styled-components'
import { toast } from 'react-toastify';
import { USER_DETAIL_RESET, USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import LoaderAction from '../components/Loader/LoaderAction'
const LabelInput = styled.label`
  color:black;
  display:block
`

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

const ProfileScreen = ({ location, history }) => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetail = useSelector(state => state.userDetail)
  const { loading, error, user } = userDetail
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { loading: loadingUpdate, success, user: userUpdated } = userUpdateProfile

  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


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
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
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
              {message && <Message variant='error'>{message}</Message>}
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
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} style={{ background: 'white' }}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}</td>
                      <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}</td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className='btn-sm' variant='light'>Details</Button>
                        </LinkContainer>
                      </td>
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
