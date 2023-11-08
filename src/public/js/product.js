
async function addToCart(id) {
    const cartId = getCartId()

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