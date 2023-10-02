const socket = io();
const content = document.getElementById("content")

socket.on("realTimeProducts", (data) => {
    let productCards = ``

    data.forEach(item => {
        productCards += `<div class="col-md-4">
        <div class="card border-0 mb-3">
            <img src="${item.thumbnail}" class="img-fluid" alt="${item.title}">
            <div class="card-body text-center">
            <p class="card-title">${item.title}</p>
            <p class="card-text">ID : ${item.id}</p>
                <span class="text-success">$${item.price}</span>
            </div>
        </div>
    </div>`;
    });
    content.innerHTML = productCards;
})

const addProduct = (data) => {

    const product = {
        id: 0,
        title: data.title,
        description: data.description,
        code: Math.random() * 1000,
        price: data.price,
        stock: 1
    }
    socket.emit("Insert", product)
}

const deleteProduct = () => {
    let pid = document.getElementById("id").value;
    pid = parseInt(pid)
    socket.emit("Delete", pid)

}