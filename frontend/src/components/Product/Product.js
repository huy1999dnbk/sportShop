import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '../Rating'
import styles from './product.module.css'
const Product = ({ product }) => {
  return (
    <>
      <Link to={`/product/${product._id}`} >
        <Card sx={{ maxWidth: 345,height:450,marginBottom:8 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="250"
              image={product.image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </Typography>
              <Typography variant="body1" color="text.secondary">
                ${product.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
      {/* <Card className={`my-3 ${styles.card}`} style={{ height: '400px', borderRadius: '30px' }}>
        <Link to={`/product/${product._id}`} style={{ overflow: 'hidden', border: 'none' }}>
          <Card.Img src={product.image} style={{ borderTopLeftRadius: '30px', borderTopRightRadius: '30px', width: '100%', height: '200px', overflow: 'hidden', border: 'none' }} />
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
      </Card> */}
    </>
  )
}

export default Product
