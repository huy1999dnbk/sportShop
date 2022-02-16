import React, { useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../action/cartAction'
import CheckoutStep from '../components/CheckoutStep'
import InputComponent from '../components/Input/InputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'
import Meta from '../components/Meta'
import { toast } from 'react-toastify';
const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    if (address === '' || city === '' || postalCode === '' || country === '') {
      toast.error('Shipping information is invalid! Please try again!')
      return;
    }
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <>
      <Meta title='Shipping Information' />
      <FormContainer>
        <CheckoutStep step1 step2 />
        <h3 className='text-center'>Shipping</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address'>
            <InputComponent className='w-100 my-3' label='Address' type='text' placeholder='Enter address' value={address} onChange={e => setAddress(e.target.value)} required>
            </InputComponent>
          </Form.Group>
          <Form.Group controlId='city'>
            <InputComponent className='w-100 my-3' label='City' type='text' placeholder='Enter city' value={city} onChange={e => setCity(e.target.value)} required>

            </InputComponent>
          </Form.Group>
          <Form.Group controlId='postalCode'>

            <InputComponent className='w-100 my-3' label='Postal Code' type='text' placeholder='Enter postalCode' value={postalCode} onChange={e => setPostalCode(e.target.value)} required>

            </InputComponent>
          </Form.Group>
          <Form.Group controlId='country'>

            <InputComponent className='w-100 my-3' label='Country' type='text' placeholder='Enter country' value={country} onChange={e => setCountry(e.target.value)} required>
            </InputComponent>
            <Row style={{ justifyContent: 'center' }}>
              <ButtonComponent onClick={submitHandler} type='submit' variant='primary'>Continue</ButtonComponent>
            </Row>
          </Form.Group>
        </Form>
      </FormContainer>
    </>

  )
}

export default ShippingScreen
