import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader/Loader'
import Message from './Message'
import { listTopProducts } from '../action/productAction'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';
SwiperCore.use([EffectCoverflow, Pagination])
const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts(5))
    }, [dispatch])

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='error'>{error}</Message>
    ) : (
        <>
            <h4 className='mb-3'>Top Rating</h4>
            <Swiper
                // install Swiper modules
                effect={'coverflow'} grabCursor={true} centeredSlides={true} slidesPerView={'auto'} coverflowEffect={{
                    "rotate": 50,
                    "stretch": 0,
                    "depth": 100,
                    "modifier": 1,
                    "slideShadows": true
                }} pagination={true} className="mySwiper mb-3"
                initialSlide="2"
            >
                {products.map(product => (
                    <SwiperSlide key={product._id}>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/product/${product._id}`}>
                            <img src={product.image} alt={product.name} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>

    )
}

export default ProductCarousel
