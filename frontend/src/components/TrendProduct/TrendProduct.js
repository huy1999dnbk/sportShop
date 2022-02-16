import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import { Pagination } from "swiper";
import { useDispatch, useSelector } from 'react-redux'
import { listTrendProducts } from '../../action/productAction'
import Loader from '../Loader/Loader';
import Message from '../Message';
import styled from 'styled-components';
import './trendingproduct.module.css'
const Container = styled.div`
  width:100% !important;
  height:100%
`
const Content = styled.p`
  color:black;
  font-size:16px;
  font-weight:bold
`
const ImagePro = styled.img`
  display:block;
  max-width:100%;
  object-fit: contain
`
const TrendProduct = () => {
  const dispatch = useDispatch()
  const productTrend = useSelector(state => state.productTrend)
  const { loading, products, error } = productTrend
  useEffect(() => {
    dispatch(listTrendProducts())
  }, [dispatch])
  return loading ? (<Loader />) : error ? (<Message variant='error'>{error}</Message>) : (
    <Container>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {products.map((item, index) => (
          <SwiperSlide className='swiper-trending' key={index}>
            <Link style={{ textDecoration: 'none' }} to={`/product/${item._id}`}>
              <Row className='p-1' style={{ alignItems: 'center' }}>
                <Col className='name-product' sm={4} >
                  <Content>{item.name}</Content>
                </Col>
                <Col xs={12} sm={8} >
                  <ImagePro src={item.image} />
                </Col>
              </Row>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

export default TrendProduct