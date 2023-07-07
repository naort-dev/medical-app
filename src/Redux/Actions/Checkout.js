export const START_CHECKOUT = 'checkout/START'
export const CANCEL_CHECKOUT = 'checkout/CANCEL'
export const COMPLETE_CHECKOUT = 'checkout/COMPLETE'
export const CLOSE_CHECKOUT = 'checkout/CLOSE'


export function startCheckout(checkoutId) {
  return {
    type: START_CHECKOUT, 
    checkoutId
  }
}

export function cancelCheckout() {  
  return {
    type: CANCEL_CHECKOUT
  }
}

export function completeCheckout(order) {
  return {
    type: COMPLETE_CHECKOUT, 
    order
  }
}

export function closeCheckout() {
  return {
    type: CLOSE_CHECKOUT
  }
}

export default {
  startCheckout, 
  cancelCheckout, 
  completeCheckout, 
  closeCheckout
}