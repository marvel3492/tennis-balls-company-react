/**
 * @param {CartType} cart
 */
export function getCartLength(cart) {
    return Object.keys(cart).length;
}

/**
 * @param {CartType} cart 
 * @param {number} productId
 */
export function getCartQuantity(cart, productId) {
    return cart[productId] ?? 0;
}

/**
 * @param {CartType} cart
 */
export function isCartEmpty(cart) {
    return getCartLength(cart) === 0;
}