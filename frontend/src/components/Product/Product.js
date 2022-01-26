import React from 'react'
import { Link } from 'react-router-dom'

import Rating from '../Rating'
import styled from 'styled-components';
const CardContainer = styled.div`
  max-width:300px;
  height:500px;
  border:none;
  @media (max-width: 576px) {
    min-width:100% !important;
  }
`
const CardImage = styled.img`
  width:100%;
  height:250px;
  display:block
`

const CardContent = styled.div`
  padding:16px;
  background:#FAFAFA;
  height:250px
`

const CardTitle = styled.h5`
  font-weight:500;
  color:black;
  text-transform:uppercase
`

const CardDescription = styled.p`
  color:black;
  font-size:14px;
`

const CardPrice = styled.div`
  display:flex;
  flex-direction:row
`

const PriceInfo = styled.span`
  color:black;
  font-size:16px;
  padding-top: 5px
`
const Product = ({ product }) => {
  return (
    <>
      <Link style={{textDecoration:'none'}} to={`/product/${product._id}`} >
        <CardContainer>
          <CardImage src={product.image} alt={product.name} />
          <CardContent>
            <CardTitle>{product.name.length > 24 ? product.name.slice(0,24) + '...' : product.name}</CardTitle>
            <CardDescription>{product.description.length > 140 ? product.description.slice(0,120) + '...' : product.description}</CardDescription>
            <CardPrice>
              <Rating value={product.rating} />
              <PriceInfo>${product.price}</PriceInfo>
            </CardPrice>
          </CardContent>
        </CardContainer>
      </Link>
    </>
  )
}

export default Product
