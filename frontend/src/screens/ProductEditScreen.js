import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader/Loader'
import LoaderAction from '../components/Loader/LoaderAction'
import FormContainer from '../components/FormContainer'
import { listProductDetail, updateProduct } from '../action/productAction'
import { PRODUCT_DETAIL_RESET, PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase'
import InputComponent from '../components/Input/InputComponent'
const ProductEditScreen = ({ match, history }) => {
    const successAlert = () => toast("Upload success to firebase!");
    const failAlert = () => toast("Upload to firebase fail!")
    const productId = match.params.id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetail

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate



    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch({ type: PRODUCT_DETAIL_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetail(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, history, product, productId, successUpdate])


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const fileName = new Date().getTime() + file.name
        const storage = getStorage(app)
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file);
        setUploading(true)

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case 'paused':

                        break;
                    case 'running':

                        break;
                }
            },
            (error) => {
                setUploading(false)
                failAlert()
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    successAlert()
                    setUploading(false)
                    setImage(downloadURL)
                });
            }
        );
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name, price, image, brand, category, description, countInStock
        }))
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <LoaderAction />}
                {errorUpdate && <Message variant='error'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='error'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='mt-3' controlId='name'>
                        
                            <InputComponent className='w-100' label='name' type='name' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)}>

                            </InputComponent>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='price'>
                          
                            <InputComponent className='w-100' label='Price' type='number' placeholder='Enter price' value={price} onChange={e => setPrice(e.target.value)}>

                            </InputComponent>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='image '>
                           
                            <InputComponent className='w-100' label='Image' type='text' placeholder='Enter image url' value={image} onChange={e => setImage(e.target.value)}>
                            </InputComponent>
                            <InputComponent variant='filled' className='w-100 mt-3' type='file' custom="true" onChange={uploadFileHandler}></InputComponent>
                            {uploading && <LoaderAction />}
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='brand '>
                          
                            <InputComponent className='w-100' label='brand' type='text' placeholder='Enter brand' value={brand} onChange={e => setBrand(e.target.value)}>

                            </InputComponent>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='countInStock'>
                         
                            <InputComponent className='w-100' label='Count in stock' type='number' placeholder='Enter countInStock' value={countInStock} onChange={e => setCountInStock(e.target.value)}>

                            </InputComponent>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='category'>
                           
                            <InputComponent className='w-100' label='category' type='text' placeholder='Enter category' value={category} onChange={e => setCategory(e.target.value)}>

                            </InputComponent>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId='description'>
                         
                            <InputComponent className='w-100' label='description' type='text' placeholder='Enter description' value={description} onChange={e => setDescription(e.target.value)}>

                            </InputComponent>
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>

    )
}

export default ProductEditScreen
