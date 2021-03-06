import React,{useEffect} from 'react';
import {Row,Col} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../action/productAction';
import Loader from '../Loader/Loader';
import Message from '../Message';
import Product from '../Product/Product';
const LastestProduct = ({keyword,pageNumber}) => {

  const dispatch = useDispatch()
  const listProduct = useSelector(state => state.productList)
  const { loading, error, products } = listProduct

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
   
  },[keyword,pageNumber,dispatch])
  return <>
    {loading ? <Loader /> : error ? <Message variant='error'>{error}</Message> : (<>
      {!keyword && <h4 className='mt-5'>All Product</h4>}
      <Row>
        {products.length === 0 && (
          <>
            <Col className='pt-5'>
              <h1>Oops</h1>
              <h4>No result for {keyword}</h4>
              <span>Try checking your spelling or use more general terms</span>
            </Col>
          </>
        )}
        {products.map(product => (
          <Col key={product._id} className='mb-3 p-0' xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>

    </>)}
  </>;
};

export default LastestProduct;
