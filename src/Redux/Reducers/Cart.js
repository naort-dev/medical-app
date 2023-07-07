import {
  CLEAR_CART,
  UPDATE_CART_ITEM,
  UPDATE_CART_ITEM_QUANTITY,
} from '../Actions/Cart';
import { LOGIN, LOGOUT } from '../Types';

export const cartReducer = (state = {items: []}, action) => {
  console.log("CART")
  console.log(state)
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return {items: []}
    case CLEAR_CART:
      return {items: []};
      case UPDATE_CART_ITEM: 
        const item = action.item
        if (item && item.quantity > 0) {
          let itemAdded = false
          const index = state.items.findIndex( i => {i.product_id === item.product_id && i.option_id === item.option_id})
          
          if (index < 0) {
            return {
              ...state, 
              items: [...state.items, item]
            }
          } else {
            let newItems = [...state.items]
            newItems[index].quantity += item.quantity
            return {
              ...state, 
              items: newItems
            }
          }
        }
      case UPDATE_CART_ITEM_QUANTITY:
        const quantity = action.quantity
        const product_id = action.product_id
        const option_id = action.option_id
        if (quantity === 0) {
          return {
            ...state, 
            items: state.items.filter(i => i.product_id !== product_id || i.option_id !== option_id)
          }
        } else {
          return {
            ...state, 
            items: state.items.map(i => { 
              return (i.product_id === product_id && i.option_id === option_id) 
                ? {...i, quantity}
                : i
            })
          }
        }
    // case UPDATE_CART_ITEM:
    //   const item = action.item;
    //   if (item && item.quantity > 0) {
    //     const index = state.items.findIndex(
    //       (it) => it.product.id === item.product.id,
    //     );
    //     const newItems = [...state.items];
    //     if (index !== -1) {
    //       newItems[index] = {...item};
    //       return {...state, items: newItems};
    //     } else {
    //       newItems.push({...item});
    //     }
    //     return {...state, items: newItems};
    //   } else {
    //     const items = state.items.filter(
    //       (it) => it.product.id !== item.product.id,
    //     );
    //     return {...state, items};
    //   }

    // case UPDATE_CART_ITEM_QUANTITY:
    //   const quantity = action.quantity;
    //   const id = action.id;
    //   //delete then check for quan > 0
    //   if (quantity === 0) {
    //     //delete when quantity is 0
    //     //find all where product name is not product to be deleted
    //     //return items to state
    //     const items = state.items.filter((it) => it.product.id !== id);
    //     return {...state, items};
    //   } else {
    //     const index = state.items.findIndex((it) => it.product.id === id);
    //     if (index !== -1) {
    //       const newItems = [...state.items];
    //       const item = {...state.items[index], quantity};
    //       newItems[index] = {...item};
    //       return {...state, items: newItems};
    //     } else {
    //       // pass, should never happen
    //     }
      // }
      // return state;
    default:
      return state;
  }
};