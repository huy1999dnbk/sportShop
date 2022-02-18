import React, { useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../action/cartAction'
import CheckoutStep from '../components/CheckoutStep'
import ButtonComponent from '../components/Button/ButtonComponent'
import Meta from '../components/Meta'
const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Stripe')

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <>
      <Meta title='Payment method' />
      <FormContainer>
        <CheckoutStep step1 step2 step3 />
        <h3 className='text-center mb-5'>Choose Your Payment Method</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Row style={{ justifyContent: 'center' }}>
              <Form.Check type='radio' label="Stripe" id='Stripe' name='paymentMethod' value='Stripe' checked onChange={e => setPaymentMethod(e.target.value)}>
              </Form.Check>
            </Row>
            <Row className='mt-5' style={{ justifyContent: 'center' }}>
              <ButtonComponent type='submit' variant='primary'>Continue</ButtonComponent>
            </Row>
          </Form.Group>
        </Form>
      </FormContainer>
    </>

  )
}

export default PaymentScreen
