export const UPDATE_CART_ITEM = 'cart/UPDATE_CART_ITEM';
export const UPDATE_CART_ITEM_QUANTITY = 'cart/UPDATE_CART_ITEM_QUANTITY';
export const CLEAR_CART = 'cart/CLEAR_CART';

export const updateCartItem = (product, option, quantity) => ({
    type: UPDATE_CART_ITEM,
    item: {
        product_id: product.id,
        option_id: option.id,
        product,
        option, 
        quantity
    }
})

export const updateCartItemQuantity = (product_id, option_id, quantity) => ({
    type: UPDATE_CART_ITEM_QUANTITY,
    product_id: product_id, 
    option_id: option_id,
    quantity
});

export const clearCart = () => ({
    type: CLEAR_CART,
})