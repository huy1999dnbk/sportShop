import React, { useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../action/orderAction'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstant'
import styled from 'styled-components'
import ButtonComponent from '../components/Button/ButtonComponent'
import Meta from '../components/Meta'
import StripeCheckout from 'react-stripe-checkout';

const ContainerOrderInfo = styled.div`
  padding:10px;
  border:1px solid #ccc;
  border-radius:5px;
  background:'white';
`

const ProductItem = styled.div`
  padding:15px;
  border-radius:10px;
`

const CardPriceSummary = styled.div`
  padding:10px;
  border:1px solid black;
  background:'white';
  border-radius:5px
`
const CardPriceTitle = styled.h3`
  text-align:center;
  color:black;
  font-weight:bold;
`
const OrderScreen = ({ match, history }) => {

  const orderId = match.params.id
  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, error, loading } = orderDetails



  const orderPay = useSelector(state => state.orderPay)
  const { success: successPay, loading: loadingPay } = orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  const makePayment = async (token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const data = await axios.post('/payment', {
      token,
      totalPrice: order.totalPrice
    }, config)
    dispatch(payOrder(orderId,{
      id:data.data.id,
      status:data.data.paid,
      email_address:data.data.billing_details.name,
      currency:data.data.currency
    }))
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } 
    
   

  }, [dispatch, orderId, successPay, successDeliver, order, userInfo])


  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? <Loader /> : error ? <Message variant='error'>{error}</Message> : <>
    <Meta title='Order' />
    <Row>
      <Col>
        <h1>Order</h1>
      </Col>
    </Row>
    <Row>
      <Col md={8}>
        <ContainerOrderInfo>
          <Row>
            <Col>
              <h4>SHIPPING</h4>
              <p>Name: {order.user.name}</p>
              <p>Address: {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}</p>
              {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='error'>Not Delivered</Message>}
            </Col>

          </Row>
          <Row className='my-4'>
            <Col>
              <h4>PAYMENT</h4>
              {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='error'>Not Paid</Message>}
            </Col>

          </Row>
          <Row>
            <Col>
              <h4>ITEMS</h4>
              {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                <div>
                  {order.orderItems.map((item, index) => (
                    <ProductItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link style={{ color: 'black' }} to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ProductItem>
                  ))}
                </div>
              )}
            </Col>

          </Row>
        </ContainerOrderInfo>
      </Col>
      <Col md={4}>
        <CardPriceSummary>
          <Row>
            <Col>
              <CardPriceTitle>Price Summary</CardPriceTitle>
            </Col>
          </Row>
          <Row className='py-2'>
            <Col>
              <Row>
                <Col>ITEMS</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </Col>
          </Row>
          <Row className='py-2'>
            <Col>
              <Row>
                <Col>SHIPPING</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </Col>
          </Row>
          <Row className='py-2'>
            <Col>
              <Row>
                <Col>TAX</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </Col>
          </Row>
          <Row className='py-2'>
            <Col>
              <Row>
                <Col>TOTAL</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </Col>
          </Row>
          {!order.isPaid && (
            <Row>
              <Col>
                {
                  <StripeCheckout stripeKey='pk_test_51KU0KNHzr2aPULLHERi1fWVBHp2Oxy1BTeBG0gfJ6O9DeRwuiGN1csKbpJMMPLvZjHTv5bo2qKguE8RQZnpCekjD00KDxRcNhm' token={makePayment} name='Checkout SportShop' amount={order.totalPrice} image="https://stripe.com/img/documentation/checkout/marketplace.png">
                    <ButtonComponent style={{minWidth:'100%'}}>Pay ${order.totalPrice}</ButtonComponent>
                  </StripeCheckout>
                }
                {loadingPay && <Loader />}
              </Col>
            </Row>
          )}
          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <Row>
              <Col>
                <ButtonComponent type='button' className='btn btn-block' onClick={deliverHandler}>Mark As Delivered</ButtonComponent>
              </Col>
            </Row>
          )}
        </CardPriceSummary>
      </Col>
    </Row>
  </>
}

export default OrderScreen
