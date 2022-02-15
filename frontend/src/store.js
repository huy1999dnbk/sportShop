import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailReducer,productDeleteReducer,productCreateReducer,productUpdateReducer,productReviewCreateReducer,productTopRatedReducer,productTrendReducer,productRecommendReducer,productTopRecommendReducer,productMentionReducer } from './reducer/productReducer'
import { cartReducer } from './reducer/cartReducer'
import { userLoginReducer,userRegisterReducer,userDetailReducer,userUpdateProfileReducer,userListReducer,userDeleteReducer,userUpdateReducer,userDetailAdminReducer } from './reducer/userReducers'
import { orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer,orderListReducer,orderDeliverReducer,getAllOrdersReducer } from './reducer/orderReducers'
const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productTrend:productTrendReducer,
  productTopRecommend:productTopRecommendReducer,
  productRecommend:productRecommendReducer,
  productMention:productMentionReducer,
  cart: cartReducer,
  userLogin:userLoginReducer,
  userRegister:userRegisterReducer,
  userDetail:userDetailReducer,
  userDetailAdmin:userDetailAdminReducer,
  userUpdateProfile:userUpdateProfileReducer,
  userList:userListReducer,
  userDelete:userDeleteReducer,
  userUpdate:userUpdateReducer,
  orderCreate:orderCreateReducer,
  orderDetails:orderDetailsReducer,
  orderPay:orderPayReducer,
  orderListMy:orderListMyReducer,
  orderList:orderListReducer,
  allOrdersList:getAllOrdersReducer,
  orderDeliver:orderDeliverReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
  cart: {
    cartItems:cartItemsFromStorage,
    shippingAddress:shippingAddressFromStorage
  },
  userLogin:{
    userInfo:userInfoFromStorage
  }
}

const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store