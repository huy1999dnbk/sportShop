import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, listRecommendProducts, listTopProducts, listTrendProducts, listTopRecommendProducts } from '../action/productAction'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

import { Link } from 'react-router-dom'
import Product from '../components/Product/Product'
import Loader from '../components/Loader/Loader'
import ProductRecommend from '../components/Product/ProductRecommend'
import LastestProduct from '../components/LastedProduct/LastestProduct'
const HomeScreen = ({ history, match }) => {

  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const listProduct = useSelector(state => state.productList)
  const { loading, error, products, pages, page } = listProduct
  const productTrend = useSelector(state => state.productTrend)
  const { loading: loadingTrend, products: productsTrend, error: errorTrend } = productTrend
  const productRecommend = useSelector(state => state.productRecommend)
  const { loading: loadingRecommend, products: productsRecommend, error: errorRecommend } = productRecommend
  const productTopRecommend = useSelector(state => state.productTopRecommend)
  const { loading: loadingTopRecommend, error: errorTopRecommend, products: productsTopRecommend } = productTopRecommend
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin





  useEffect(() => {
   
    localStorage.setItem('pageNum', JSON.stringify(pageNumber))
    return () => {
      if (history.action === 'POP') {
    
        window.location.reload()
      }
      localStorage.removeItem('pageNum')
    }
  }, [pageNumber])

  useEffect(() => {
    dispatch(listTrendProducts())
    if (userInfo) {
      dispatch(listRecommendProducts())
    } else {
      dispatch(listTopRecommendProducts(8))
    }
  }, [dispatch, userInfo])
  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <ProductCarousel />
          <div>
            <h4>Just for you</h4>
            {loadingTopRecommend ? <Loader /> : errorTopRecommend ? <Message variant='error'>{errorTopRecommend}</Message> : (
              <Row>
                {!userInfo && productsTopRecommend.map((item, index) => (
                  <Col className='mb-3 p-0' xs={12} sm={6} md={4} lg={3} key={index}>
                    <ProductRecommend product={item} />
                  </Col>
                ))}
              </Row>
            )}
            {loadingRecommend ? <Loader /> : errorRecommend ? <Message variant='error'>{errorRecommend}</Message> : (
              <Row>
                {userInfo && productsRecommend.map((item, index) => (
                  <Col className='mb-3 p-0' xs={12} sm={6} md={4} lg={3} key={index}>
                    <ProductRecommend product={item} />
                  </Col>
                ))}
              </Row>
            )}
            <h4>Trending Product</h4>
            {loadingTrend ? <Loader /> : errorTrend ? <Message variant='error'>{errorTrend}</Message> : (
              <Row>
                {productsTrend.map((item, index) => (
                  <Col className='mb-3 p-0' xs={12} sm={6} md={4} lg={3} key={index}>
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
      <LastestProduct keyword={keyword} pageNumber={pageNumber} />

      <Paginate productList={products} pages={pages} page={page} keyword={keyword ? keyword : ''} />

    </>
  )
}
export default HomeScreen
