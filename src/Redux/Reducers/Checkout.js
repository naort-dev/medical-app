import {
  START_CHECKOUT, 
  CANCEL_CHECKOUT, 
  COMPLETE_CHECKOUT, 
  CLOSE_CHECKOUT
} from '../Actions/Checkout'

const initialState = {
  isCheckingOut: false, 
  checkoutId: undefined,
  order: undefined
}


export function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case START_CHECKOUT: 
      return {
        isCheckingOut: true,
        checkoutId: action.checkoutId
      }
    case CANCEL_CHECKOUT: 
      return initialState
    case COMPLETE_CHECKOUT: 
      return {
        ...state,
        isCheckingOut: false, 
        order: action.order
      }
    case CLOSE_CHECKOUT:
      return initialState
    default: 
      return state
  }
}