const socket = io();

socket.on("realTimeProducts", ({ products, message }) => {

    if (message !== undefined) {

        Swal.fire({
            title: message.title,
            icon: message.icon,
            text: message.text,
            timer: message.timer
        })
    }

    let productCards = ``

    products.forEach(item => {
        productCards +=
            `        <div class="col mt-3">
        <div class="card" style="width: 18rem;">
            <img src="${item.thumbnail}" class="card-img-top " style="object-fit: cover; height: 12rem;" alt="...">
            <div class="card-body">
                <h5 class="card-title" style="height: 4rem;">${item.title}</h5>
                <h5 class="card-title" >ID : ${item._id}</h5>
                <p>$${item.price}</p>
                <p class="card-text">${item.description}</p>
                <a href="#" class="btn btn-primary">Buy Now</a>
            </div>
        </div>
    </div>`;
    });
    content.innerHTML = productCards;
})

const addProduct = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const product = {
        title: title,
        description: description,
        code: Math.random() * 1000,
        price: price,
        stock: 1,
        thumbnail: 'test'
    }
    socket.emit("Insert", product)
}

const deleteProduct = () => {
    let pid = document.getElementById("id").value;
    pid = parseInt(pid)
    socket.emit("Delete", pid)

}