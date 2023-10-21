const socket = io();
const messages = document.getElementById("messages");

socket.on("messages", (data) => {
    displayMessages(data);
});

socket.on("newMessage", (data) => {
    appendMessage(data);
});

function displayMessages(data) {
    messages.innerHTML = "";
    data.forEach(item => {
        appendMessage(item);
    });
}

function appendMessage(item) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("card", "mb-3");
    messageDiv.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${item.user}</h5>
            <p class="card-text">${item.message}</p>
        </div>
    `;
    messages.appendChild(messageDiv);
}

const sendMessage = () => {
    const user = document.getElementById("user");
    const message = document.getElementById("message");
    const userValue = user.value;
    const messageValue = message.value;

    appendMessage({ user: userValue, message: messageValue });

    socket.emit("newMessage", { user: userValue, message: messageValue });
    message.value = "";
}

const btnSendMessage = document.getElementById("btnSendMessage");
btnSendMessage.onclick = sendMessage;
