function getCartId() {
    const cart = JSON.parse(localStorage.getItem("cart") || '{}');
    return cart._id || null;
};