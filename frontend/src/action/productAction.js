import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,PRODUCT_CREATE_FAIL,PRODUCT_CREATE_REQUEST,PRODUCT_CREATE_SUCCESS,PRODUCT_UPDATE_FAIL,PRODUCT_UPDATE_REQUEST,PRODUCT_UPDATE_SUCCESS, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_TREND_REQUEST, PRODUCT_TREND_SUCCESS, PRODUCT_TREND_FAIL, PRODUCT_RECOMMEND_REQUEST, PRODUCT_RECOMMEND_SUCCESS, PRODUCT_RECOMMEND_FAIL, PRODUCT_TOP_RECOMMEND_REQUEST, PRODUCT_TOP_RECOMMEND_SUCCESS, PRODUCT_TOP_RECOMMEND_FAIL, PRODUCT_MENTION_REQUEST, PRODUCT_MENTION_SUCCESS, PRODUCT_MENTION_FAIL } from '../constants/productConstants'
import axios from 'axios'
import {toast} from 'react-toastify'
export const listProducts = (keyword = '',pageNumber = '') => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST
    })

    const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAIL_REQUEST
    })

    const { data } = await axios.get(`/api/products/${id}`)


    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/products/${id}`, config)

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
    toast.success('Delete successfully!')
  } catch (error) {
    toast.error('Delete fail! Please try again!')
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const mentionProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_MENTION_REQUEST
    })
    await axios.post(`/api/products/${id}`)

    dispatch({
      type: PRODUCT_MENTION_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_MENTION_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const {data} =  await axios.post(`/api/products`,{}, config)

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload:data
    })
    toast.success('Create product successfully!')
  } catch (error) {
    toast.error('Create fail! Please try again')
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const {data} =  await axios.put(`/api/products/${product._id}`,product, config)

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload:data
    })
    toast.success('Update successfully!')
  } catch (error) {
    toast.error('Update fail! Please try again')
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const createProductReview = (productId,review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.post(`/api/products/${productId}/reviews`,review, config)

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    })
    toast.success('Review success!!')
  } catch (error) {
    const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message
    toast.error(errorMessage)
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listTopProducts = (qty) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_TOP_REQUEST
    })

    const { data } = await axios.get(`/api/products/top/${qty}`)

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listTrendProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_TREND_REQUEST
    })

    const { data } = await axios.get(`/api/products/trend`)

    dispatch({
      type: PRODUCT_TREND_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TREND_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const listTopRecommendProducts = (qty) => async (dispatch,getState) => {
  try {
    dispatch({
      type: PRODUCT_TOP_RECOMMEND_REQUEST
    })
    
    const { data } = await axios.get(`/api/products/top/${qty}`)

    dispatch({
      type: PRODUCT_TOP_RECOMMEND_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_RECOMMEND_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const listRecommendProducts = () => async (dispatch,getState) => {
  try {
    dispatch({
      type: PRODUCT_RECOMMEND_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(`/api/products/recommendproduct`,config)

    dispatch({
      type: PRODUCT_RECOMMEND_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_RECOMMEND_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}
