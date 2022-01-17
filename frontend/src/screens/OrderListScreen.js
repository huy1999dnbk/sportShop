import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader/Loader'
import { listOrders } from '../action/orderAction'
import { ORDER_DETAILS_RESET } from '../constants/orderConstant'
import styled from 'styled-components'

const TdComponent = styled.td`
  border:none !important;
  padding:18px 5px !important;
  text-align:center;
  font-size:16px
`
const ThComponent = styled.th`
  border:none !important;
  padding:18px 5px !important;
  text-align:center
`

const TableContainer = styled.div`
  border-radius:10px;
  -webkit-box-shadow: 2px 6px 15px -1px #000000; 
  box-shadow: 2px 6px 15px -1px #000000;
`



const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch({ type: ORDER_DETAILS_RESET })
      dispatch(listOrders())
    } else {
      history.push('/login')
    }

  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Orders</h1>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <TableContainer>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
              
                <ThComponent>USER</ThComponent>
                <ThComponent>DATE</ThComponent>
                <ThComponent>TOTAL</ThComponent>
                <ThComponent>PAID</ThComponent>
                <ThComponent>DELIVERED</ThComponent>
                <ThComponent>ACTION</ThComponent>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} style={{ background: 'white' }}>
                
                  <TdComponent>{order.user && order.user.name}</TdComponent>
                  <TdComponent>{order.createdAt.substring(0, 10)}</TdComponent>
                  <TdComponent>${order.totalPrice}</TdComponent>
                  <TdComponent>
                    {order.isPaid ? (order.paidAt.substring(0, 10)) : (<i className='fas fa-times' style={{ color: 'red' }}></i>)}
                  </TdComponent>
                  <TdComponent>
                    {order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (<i className='fas fa-times' style={{ color: 'red' }}></i>)}
                  </TdComponent>
                  <TdComponent>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </TdComponent>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default OrderListScreen
