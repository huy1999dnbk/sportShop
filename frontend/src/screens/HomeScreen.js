import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, listTrendProducts } from '../action/productAction'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

import { Link } from 'react-router-dom'
import Product from '../components/Product/Product'
import Loader from '../components/Loader/Loader'
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const listProduct = useSelector(state => state.productList)
  const { loading, error, products, pages, page } = listProduct
  const productTrend = useSelector(state => state.productTrend)
  const { loading: loadingTrend, products: productsTrend, error: errorTrend } = productTrend


  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
    dispatch(listTrendProducts())
  }, [dispatch, keyword, pageNumber])
  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <ProductCarousel />
          <div>
            <h4>Trending product</h4>
            {loadingTrend ? <Loader /> : errorTrend ? <Message variant='danger'>{errorTrend}</Message> : (
              <Row>
                {productsTrend.map((item, index) => (
                  <Col md={3} sm={12} key={index}>
                    <Product product={item} />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>
        </>
      )}

      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<>
        {!keyword && <h4>Latest product</h4>}
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
