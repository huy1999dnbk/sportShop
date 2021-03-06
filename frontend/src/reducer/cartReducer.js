import {CARD_ADD_ITEM,CARD_REMOVE_ITEM,CARD_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD,CART_RESET} from '../constants/cartConstant'

export const cartReducer = (state = { cartItems : [],shippingAddress:{} },action) => {
  switch (action.type) {
    case CARD_ADD_ITEM:
      const item = action.payload
      const itemExist = state.cartItems.find(x => x.product === item.product)
      if(itemExist) {
        return {
          ...state,
          cartItems:[...state.cartItems.map(x => x.product === itemExist.product ? item : x )]
        }
      }else {
        return {
          ...state,
          cartItems:[...state.cartItems,item]
        }
      }
    case CARD_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload)
      }
    case CARD_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress:action.payload
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod:action.payload
      }
    case CART_RESET:
      return {
        cartItems : [],shippingAddress:{} 
      }
    default:
      return {...state}
  }
}
