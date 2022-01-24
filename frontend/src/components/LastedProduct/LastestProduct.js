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
  },[keyword,pageNumber])
  return <>
    {loading ? <Loader /> : error ? <Message variant='error'>{error}</Message> : (<>
      {!keyword && <h4>Latest product</h4>}
      <Row>
        {products.map(product => (
          <Col key={product._id} className='mb-3' xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>

    </>)}
  </>;
};

export default LastestProduct;
