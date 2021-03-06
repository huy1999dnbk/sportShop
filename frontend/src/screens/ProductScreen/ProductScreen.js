import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Image, ListGroup, Form } from 'react-bootstrap'
import Rating from '../../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message'
import { listProductDetail, createProductReview, mentionProduct } from '../../action/productAction'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import Meta from '../../components/Meta'
import ButtonComponent from '../../components/Button/ButtonComponent'
import styles from './productscreen.module.css'

import styled from 'styled-components'
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

const ProductScreen = ({ history, match }) => {
  
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [errorSubmit, setErrorSubmit] = useState(false)

  const dispatch = useDispatch()
  const productDetail = useSelector(state => state.productDetail)
  const { loading, error, product } = productDetail

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { success: successProductReview, loading: loadingReview } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetail(match.params.id))
    dispatch(mentionProduct(match.params.id))
    return () => {
      if (history.action === 'POP') {
        window.location.reload()
      }
    }
  }, [dispatch, match, successProductReview, history])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (String(rating) === '0' || comment === '') {
      setErrorSubmit(true)
    } else {
      setErrorSubmit(false)
      dispatch(createProductReview(match.params.id, {
        rating, comment
      }))
    }
  }

  const handleChangeCounter = (operator) => {
    if (operator === -1 && qty === 1) {
      return;
    }
    if (operator === -1) {
      setQty(prevState => prevState - 1)
    }

    if (operator === 1 && Number(product.countInStock) === qty) {
      return;
    }
    if (operator === 1) {
      setQty(prevState => prevState + 1)
    }
  }

  return (
    <>
      <Meta title={product.name} />
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      {loading ? <Loader /> : error ? <Message variant='error'>{error}</Message> : (<>

        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} style={{ width: '100%', height: '100%', maxHeight: '700px' }} />
          </Col>
          <Col md={6}>
            <p className={styles.nameProd}>{product.name}</p>
            <p className={styles.descProd}>{product.description}</p>
            <p className={styles.priceProd}>${product.price}</p>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            <p className={styles.status}>Status: {product.countInStock > 0 ? <span>In Stock</span> : <span>Temporarily out of stock.</span>}</p>
            {
              product.countInStock > 0 && (
                <Row>
                  <Col md={5}>
                    <ContainerCounter>
                      <ButtonCounter onClick={() => handleChangeCounter(-1)}>-</ButtonCounter>
                      <NumberProduct >{qty}</NumberProduct>
                      <ButtonCounter onClick={() => handleChangeCounter(1)}>+</ButtonCounter>
                    </ContainerCounter>
                  </Col>
                  <Col md={7}>
                    <ButtonComponent onClick={addToCartHandler} disabled={product.countInStock === 0}>
                      Add to Cart
                    </ButtonComponent>
                  </Col>
                </Row>
              )
            }
          </Col>
        </Row>
        <Row style={{ margin: '32px 0' }}>
          <Col md={6} >
            <h3>Reviews</h3>
            {product.reviews.length === 0 && <Message>No reviews</Message>}
            {product.reviews.map(review => (
              <div className={styles.review} key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </div>
            ))}
            {loadingReview && <Loader />}
          </Col>
          <Col md={6}>

            <ListGroup>
              <h3>Write a Review</h3>
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='rating'>
                    <Form.Label>
                      Rating
                    </Form.Label>
                    <Form.Control as='select' value={rating} onChange={e => setRating(e.target.value)}>
                      <option value='0'>Select...</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      F       <option value='5'>5</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='comment' style={{ marginTop: '16px' }}>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as='textarea' row='3' value={comment} onChange={e => setComment(e.target.value)}>
                    </Form.Control>
                  </Form.Group>
                  {errorSubmit && <p style={{ color: 'red', fontWeight: 'bold' }}>An error occurred, please try again</p>}
                  <Row style={{ justifyContent: 'center', marginTop: '24px' }}>
                    <button className={styles.buttonSubmit} type='submit' variant='primary'>
                      Submit
                    </button>
                  </Row>

                </Form>
              ) : (<Message>
                Please <Link to='/login'>sign in</Link> to write a review
                {' '}
              </Message>)}
            </ListGroup>
          </Col>
        </Row>
      </>)}
    </>
  )
}

export default ProductScreen
