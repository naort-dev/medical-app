import Auth from './Auth';
import Config from './Config';
import {cartReducer } from './Cart';
import {combineReducers} from 'redux';
import { checkoutReducer } from './Checkout';

export default combineReducers({
  Auth: Auth,
  Config: Config,
  cart: cartReducer,
  checkout: checkoutReducer
});

//const getItemsinCart = state => fromCart.getAddedItems(state.cart)
//const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
//const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

/*export const getTotal = state =>
  getAddedIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2)

export const getCartProducts = state =>
  getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  }))*/
