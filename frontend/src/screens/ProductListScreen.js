import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import ButtonComponent from '../components/Button/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader/Loader'
import LoaderAction from '../components/Loader/LoaderAction'
import { listProducts, deleteProduct, createProduct } from '../action/productAction'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import styled from 'styled-components'

const TdComponent = styled.td`
  border:none !important;
  padding:16px 5px;
  text-align:center;
  font-size:16px;
  vertical-align: middle !important;
`
const ThComponent = styled.th`
  border:none !important;
  padding:18px 5px !important;
  text-align:center
`

const TableContainer = styled.div`
  border-radius:10px;
  -webkit-box-shadow: 2px 6px 15px -1px #000000; 
  box-shadow: 2px 6px 15px -1px #000000;
`

const AvatarProd = styled.img`
    display:block;
    width:56px;
    height:56px;
    border-radius:50%;
    border:none;
`
const ProductListScreen = ({ history, match }) => {


    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList
    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = productCreate

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }


    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <ButtonComponent className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </ButtonComponent>
                </Col>
            </Row>
            {loadingDelete && <LoaderAction />}
            {errorDelete && <Message variant='error'>{errorDelete}</Message>}
            {loadingCreate && <LoaderAction />}
            {errorCreate && <Message variant='error'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='error'>{error}</Message> : (
                <>
                    <TableContainer>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <ThComponent>Image</ThComponent>
                                    <ThComponent>NAME</ThComponent>
                                    <ThComponent>PRICE</ThComponent>
                                    <ThComponent>CATEGORY</ThComponent>
                                    <ThComponent>BRAND</ThComponent>
                                    <ThComponent>ACTION</ThComponent>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id} style={{ background: 'white' }}>
                                        <TdComponent style={{padding:'5px 0px 5px 16px'}}>
                                            <AvatarProd
                                                alt={product.name}
                                                src={product.image}
                                                onError={e => {
                                                    e.target.src = '/images/sample.jpg'
                                                }}
                                            />
                                        </TdComponent>
                                        <TdComponent style={{ maxWidth: '400px' }}>{product.name.length > 40 ? product.name.slice(0, 40) + '...' : product.name}</TdComponent>
                                        <TdComponent>{product.price}</TdComponent>
                                        <TdComponent>
                                            {product.category}
                                        </TdComponent>
                                        <TdComponent>
                                            {product.brand.length > 20 ? product.brand.slice(0, 20) + '...' : product.brand}
                                        </TdComponent>
                                        <TdComponent>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' >
                                                    <ModeEditOutlineRoundedIcon sx={{ color: 'blue' }} />
                                                </Button>
                                            </LinkContainer>
                                            <Button className='ml-2' style={{ background: 'white', borderColor: 'green' }} onClick={() => deleteHandler(product._id)}>
                                                <DeleteForeverRoundedIcon sx={{ color: 'green' }} />
                                            </Button>
                                        </TdComponent>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </TableContainer>

                </>
            )}
            <Paginate page={page} pages={pages} isAdmin={true} productList={products} />
        </>
    )
}

export default ProductListScreen
