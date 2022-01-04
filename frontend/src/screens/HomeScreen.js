import React, { useState, useEffect } from 'react'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../action/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import Chatbot from '../components/Chatbot/Chatbot'
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const listProduct = useSelector(state => state.productList)
  const { loading, error, products, pages, page } = listProduct


  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))

  }, [dispatch, keyword, pageNumber])
  return (
    <>
      <Meta />
      {!keyword ? <ProductCarousel /> : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Sản phẩm mới nhất</h1>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<>
        <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
      </>)}


    </>
  )
}
export default HomeScreen
