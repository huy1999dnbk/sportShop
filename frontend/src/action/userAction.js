import { USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_DETAIL_RESET, USER_LIST_FAIL, USER_LIST_SUCCESS, USER_LIST_REQUEST, USER_LIST_RESET, USER_DELETE_FAIL, USER_DELETE_SUCCESS, USER_DELETE_REQUEST, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_PROFILE_RESET, USER_DETAIL_ADMIN_FAIL, USER_DETAIL_ADMIN_SUCCESS, USER_DETAIL_ADMIN_REQUEST,USER_REGISTER_RESET,USER_DETAIL_ADMIN_RESET } from "../constants/userConstants"
import { ORDER_DETAILS_RESET, ORDER_LIST_MY_RESET } from "../constants/orderConstant"
import { CART_RESET } from '../constants/cartConstant'
import axios from 'axios'
import { toast } from 'react-toastify';
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      'api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    toast.success("Login success");

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    toast.error("Login fail, try again!!");
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: ORDER_DETAILS_RESET })
  dispatch({
    type: USER_LOGOUT
  })
  dispatch({
    type:USER_REGISTER_RESET
  })
  dispatch({
    type: USER_DETAIL_RESET
  })
  dispatch({
    type: ORDER_LIST_MY_RESET
  })
  dispatch({
    type: USER_LIST_RESET
  })
  dispatch({
    type: CART_RESET
  })
}

export const register = (name, email, password,phoneNumber) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      'api/users',
      { name, email, password,phoneNumber },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    toast.success('Register successfully!')
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    toast.error("Register fail, try again!!");
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAIL_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(
      `/api/users/${id}`,
      config
    )

    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}
export const getUserDetailsAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAIL_ADMIN_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(
      `/api/users/${id}`,
      config
    )

    dispatch({
      type: USER_DETAIL_ADMIN_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_DETAIL_ADMIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      `/api/users/profile`,
      user,
      config
    )


    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    toast.success("Update profile success!");
    dispatch({
      type:USER_UPDATE_PROFILE_RESET
    })
    dispatch(getUserDetails('profile'))
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    toast.error("Update profile fail, try again!!");
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listUsers = (pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(
      `/api/users?pageNumber=${pageNumber}`,
      config
    )

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(
      `/api/users/${id}`,
      config
    )

    dispatch({
      type: USER_DELETE_SUCCESS,
    })
    toast.success('Delete successfully!')
  } catch (error) {
    toast.error('Delete faile! Try again')
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      `/api/users/${user._id}`, user,
      config
    )

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload:data
    })

    dispatch({
      type: USER_DETAIL_ADMIN_RESET
    })

    toast.success('Update User successfully!')
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}