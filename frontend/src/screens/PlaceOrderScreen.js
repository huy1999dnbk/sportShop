import React, { useState, useEffect } from 'react'
import { Row, Button, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutStep from '../components/CheckoutStep'
import { createOrder } from '../action/orderAction'
import { ORDER_CREATE_RESET } from '../constants/orderConstant'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import styled from 'styled-components'
import ButtonComponent from '../components/Button/ButtonComponent'
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
const CardOrderSummary = styled.div`
  padding:10px;
  border:1px solid black;
  background:'white';
  border-radius:5px
`
const CardOrderTitle = styled.h3`
  text-align:center;
  color:black;
  font-weight:bold;
`
const CardOrderInfo = styled.div`
  padding:8px;
  border: 1px solid #ccc;
  border-radius:5px;
`
const ProductItem = styled.div`
  padding:15px;
  border-radius:10px;
  
`


const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingPrice = addDecimals(
    cart.itemsPrice > 100 ? 0 : 100
  )

  cart.taxPrice = addDecimals(
    Number((0.15 * cart.itemsPrice).toFixed(2))
  )

  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, error, success } = orderCreate

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET })
      history.push(`/order/${order._id}`)
    }
  }, [success, history])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice
    }))
  }

  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <CardOrderInfo>
            <Row>
              <Col>
                <h4>SHIPPING</h4>
                <p>
                  <LocalShippingRoundedIcon /> <DoubleArrowRoundedIcon />{'   '}
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                  {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>PAYMENT</h4>
                <PaymentRoundedIcon /> {cart.paymentMethod}
              </Col>
            </Row>
            <Row className='pt-3'>
              <Col>
                <h4>
                  PRODUCT
                </h4>
                {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                  <div>
                    {cart.cartItems.map((item, index) => (
                      <ProductItem key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col>
                            <Link style={{ color: 'black' }} to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = ${item.qty * item.price}
                          </Col>
                        </Row>
                      </ProductItem>
                    ))}
                  </div>
                )}

              </Col>
            </Row>
          </CardOrderInfo>
        </Col>
        <Col md={4}>
          <CardOrderSummary>
            <Row>
              <Col>
                <CardOrderTitle>Order Summary</CardOrderTitle>
              </Col>
            </Row>
            <Row className='py-2'>
              <Col>
                <Row>
                  <Col>ITEMS</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </Col>
            </Row>
            <Row className='py-2'>
              <Col>
                <Row>
                  <Col>SHIPPING</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </Col>
            </Row>
            <Row className='py-2'>
              <Col>
                <Row>
                  <Col>TAX</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </Col>
            </Row>
            <Row className='py-2'>
              <Col>
                <Row>
                  <Col>TOTAL</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                {error && <Message variant='error'>{error}</Message>}
              </Col>
            </Row>
            <Row className='py-2'>
              <Col>
                <ButtonComponent type='button' className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>Place Order</ButtonComponent>
              </Col>
            </Row>
          </CardOrderSummary>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
