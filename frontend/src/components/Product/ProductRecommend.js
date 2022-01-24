import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const Card = styled.div`
  z-index:2;
  max-width:300px;
  height:400px;
  border:none;  
  position: relative;
  &:before{
    content:'';
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:1px;
    background-image: linear-gradient(rgb(255, 255, 255,0.3), rgb(0, 0, 0,0.4));
    z-index:-1;
    transition: all 0.3s ease-in-out;
    opacity:0;
  };
  &:hover:before{
    height: 100%;
    opacity:1;
    z-index:1;
  };
  &:hover > .title{
    opacity:1;
    z-index:1;
  };
  @media (max-width: 576px) {
    min-width:100% !important;
  }
`
const CardImg = styled.img`
  width:100%;
  height:100%;
  display:block;
  overflow:hidden;
  object-fit:cover
`
const CardTitle = styled.h5`
  color:white;
  position:absolute;
  bottom:10px;
  right:10px;
  z-index:100;
  opacity:0;
  font-size:20px
`
const ProductRecommend = ({ product }) => {
  return <Link style={{ textDecoration: 'none' }} to={`/product/${product._id}`}>
    <Card>
      <CardImg src={product.image} alt={product.name} />
      <CardTitle className='title'>{product.name.length > 20 ? product.name.slice(0,20) + '...' : product.name}</CardTitle>
    </Card>
  </Link>
};

export default ProductRecommend;
