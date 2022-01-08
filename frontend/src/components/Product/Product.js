import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from '../Rating'
import styles from './product.module.css'
const Product = ({ product }) => {
  return (
    <Card className={`my-3 ${styles.card}`} style={{ height: '400px', borderRadius: '30px' }}>
      <Link to={`/product/${product._id}`} style={{ overflow: 'hidden',border:'none' }}>
        <Card.Img src={product.image} style={{ borderTopLeftRadius: '30px', borderTopRightRadius: '30px', width: '100%', height: '200px', overflow: 'hidden',border:'none' }} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }} >
          <Card.Title as='div'>
            <span >{product.name}</span>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as='h5'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
