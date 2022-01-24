import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl, ButtonToolbar } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../action/cartAction'
import ButtonComponent from '../components/Button/ButtonComponent'
import Modal from '../components/Modal/Modal'
import styled from 'styled-components'

const CardCheckOut = styled.div`
  padding:16px;
  -webkit-box-shadow: 5px 5px 7px 6px rgba(0,0,0,0.22); 
  ox-shadow: 5px 5px 7px 6px rgba(0,0,0,0.22);
  border:0;
  border-radius:10px
`

const TotalPrice = styled.p`
  font-size:28px;
  color:black
`
const ContainerCounter = styled.div`
  height:60px;
  border:none;
  display:flex;
  flex-direction:row;
  max-width:150px
`

const ButtonCounter = styled.button`
  width:45px;
  height:45px;
  border-radius:5px;
  border:none;
  color:black;
  font-size:24px;
  background:white;
  &:hover{
    background:#ccc
  }
`

const NumberProduct = styled.span`
  height:48px;
  border:none;
  font-size:24px;
  color:black;
  max-width:60px;
  background:white;
  margin:0 12px;
  padding-top:5px;
`

const CartScreen = ({ match, location, history }) => {

  const dispatch = useDispatch()
  const productId = match.params.id
  const [showModal, setShowModal] = useState(false)
  const [productDelete, setProductDelete] = useState('')
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const cart = useSelector(state => state.cart)

  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [productId, qty])


  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  const closeModal = () => {
    setShowModal(false)
    setProductDelete('')
  }


  const confirmModal = (id) => {
    dispatch(removeFromCart(productDelete))
    setShowModal(false)
    setProductDelete('')
  }

  const handleChangeCounter = (operator,productBuy,productStock,productId) => {
    if (operator === -1 && productBuy === 1) {
      setProductDelete(productId)
      setShowModal(true)
      return;
    }
    if (operator === -1) {
      dispatch(addToCart(productId, Number(productBuy) - 1))
    }

    if (operator === 1 && Number(productStock) === Number(productBuy)) {
      return;
    }
    if (operator === 1) {
      dispatch(addToCart(productId, Number(productBuy) + 1))
    }
  }

  return (
    <>
      {showModal && <Modal onCancel={closeModal} title='Are you sure' content='Do you want to delete this product?' onConfirm={confirmModal} />}
      <Row style={{ paddingTop: '16px' }}>
        <Col md={8} >
          <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>Your cart</h2>
          {
            cartItems.length === 0 ? (
              <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
            ) : (
              <>
                {
                  cartItems.map((item, index) => (
                    <Row key={index} style={{ marginBottom: '24px' }}>
                      <Col md={3}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={6}>
                        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                          Product: <span style={{ fontWeight: 'normal' }}>{item.name}</span>
                        </p>
                        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                          Category: <span style={{ fontWeight: 'normal' }}>{item.category}</span>
                        </p>
                        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                          Total: <span style={{ fontWeight: 'normal' }}>${(item.price * item.qty).toFixed(2)}</span>
                        </p>
                      </Col>
                      <Col md={3}>
                        <Row>
                          <Col md={12}>
                            <ContainerCounter>
                              <ButtonCounter onClick={() => handleChangeCounter(-1,item.qty,item.countInStock,item.product)}>-</ButtonCounter>
                              <NumberProduct >{item.qty}</NumberProduct>
                              <ButtonCounter onClick={() => handleChangeCounter(1,item.qty,item.countInStock,item.product)}>+</ButtonCounter>
                            </ContainerCounter>
                          </Col>
                          <Col md={12} style={{ marginTop: '1rem' }}>
                            <Row style={{ justifyContent: 'center' }}>
                              <ButtonComponent onClick={() => {
                                setProductDelete(item.product)
                                setShowModal(true)
                              }}>
                                <i className='fas fa-trash'></i>
                              </ButtonComponent>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  ))
                }
              </>
            )
          }
        </Col>
        <Col md={4}>
          <CardCheckOut style={{ marginTop: '24px' }}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items </h2>
                <TotalPrice >
                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </TotalPrice>
              </ListGroup.Item>
              <ListGroup.Item style={{ margin: '0 auto' }}>
                <ButtonComponent bgDark disabled={cartItems.length === 0} onClick={checkoutHandler}>
                  Proceed to CheckOut
                </ButtonComponent>
              </ListGroup.Item>
            </ListGroup>
          </CardCheckOut>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen
