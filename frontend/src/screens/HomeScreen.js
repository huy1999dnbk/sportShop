import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listRecommendProducts, listTopRecommendProducts } from '../action/productAction'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

import { Link,useLocation } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import ProductRecommend from '../components/Product/ProductRecommend'
import LastestProduct from '../components/LastedProduct/LastestProduct'
import TrendProduct from '../components/TrendProduct/TrendProduct'
const HomeScreen = ({ history, match }) => {
  const location = useLocation()
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const listProduct = useSelector(state => state.productList)
  const { products, pages, page } = listProduct

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
    if (userInfo) {
      dispatch(listRecommendProducts())
    } else {
      dispatch(listTopRecommendProducts(8))
    }
  }, [dispatch, userInfo])
  return (
    <>
   
      {!keyword ? (
        <>
           <Meta />
          <ProductCarousel />
          <div>
            <h4>Just For You</h4>
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
            <h4 className='mt-5'>Most Viewed Products</h4>
         
              <TrendProduct />
          

          </div>
        </>
      ) : (
        <>
           <Meta title={`Search for ${keyword}`} />
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
