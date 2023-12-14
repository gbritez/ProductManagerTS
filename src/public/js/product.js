const { response } = require("express");

async function addToCart(id) {
    const cartId = await getCartId()
    try {
        await fetch("/api/carts/" + cartId, {
            method: "PUT",
            body: JSON.stringify({ productIds: [id] }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({ title: 'Success', icon: 'success', text: 'Product added successfully', timer: 1000 })
            });
    }
    catch (error) {
        console.log(error)
    }
}

async function deleteProduct(pid) {
    const cartId = await getCartId()
    try {
        await fetch(`/api/carts/${cartId}/product/${pid}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({ title: 'Success', icon: 'success', text: 'Product deleted successfully', timer: 1000 })
            });
    }
    catch (error) {
        console.log(error)
    }
}