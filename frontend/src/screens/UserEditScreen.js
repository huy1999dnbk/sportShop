import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader/Loader'
import LoaderAction from '../components/Loader/LoaderAction'
import FormContainer from '../components/FormContainer'
import { getUserDetails, getUserDetailsAdmin, logout, updateUser } from '../action/userAction'
import { USER_DETAIL_RESET, USER_UPDATE_RESET } from '../constants/userConstants'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputComponent from '../components/Input/InputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'
import { toast } from 'react-toastify'
const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDetailAdmin = useSelector(state => state.userDetailAdmin)
  const { loading, error, user } = userDetailAdmin
  const userUpdate = useSelector(state => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate, user: userUpdateAdmin } = userUpdate


  useEffect(() => {
    if (successUpdate) {
      if (userUpdateAdmin && !userUpdateAdmin.isAdmin && String(userUpdateAdmin._id) === String(userInfo._id)) {
        dispatch({ type: USER_UPDATE_RESET })
        dispatch(logout())
        return history.replace('/')
      }
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetailsAdmin(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setPhoneNumber(user.phoneNumber)
        setIsAdmin(user.isAdmin)
      }
    }

  }, [dispatch, userId, user, successUpdate])


  const submitHandler = (e) => {
    e.preventDefault()
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
    if(name === '' || !regexEmail.test(email) || !regexPhone.test(phoneNumber)) {
      return toast.error('Information update is invalid! Please check again!')
    }
    dispatch(updateUser({ _id: userId, name, email, isAdmin, phoneNumber }))

  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <LoaderAction />}
        {errorUpdate && <Message variant='error'>{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='error'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>

              <InputComponent className='w-100' label='name' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)}>

              </InputComponent>
            </Form.Group>
            <Form.Group controlId='email' className='mt-3'>

              <InputComponent className='w-100' label='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}>

              </InputComponent>
            </Form.Group>
            <Form.Group controlId='phone' className='mt-3'>

              <InputComponent className='w-100' label='phone' placeholder='Enter your phone number' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}>

              </InputComponent>
            </Form.Group>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} color='default' />} label="Admin" />
            </FormGroup>
            <Row style={{ justifyContent: 'center' }}>
              <ButtonComponent type='submit'>Update</ButtonComponent>
            </Row>

          </Form>
        )}
      </FormContainer>
    </>

  )
}

export default UserEditScreen
