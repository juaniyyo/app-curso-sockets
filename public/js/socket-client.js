const lblOffline = document.getElementById('lblOffline');
const lblOnline = document.getElementById('lblOnline');
const txtMessage = document.getElementById('txtMessage');
const btnSend = document.getElementById('btnSend');
const divMessages = document.getElementById('divMessages');

const socket = io();

socket.on('connect', () => {
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socket.on('send-message', (payload) => {
    divMessages.innerHTML += `<p>User ID:<strong> ${payload.id}</strong> Message: ${payload.message} | Date: ${payload.date} </p>`;
});

btnSend.addEventListener("click", () => {
    const message = txtMessage.value;
    
    const payload = {
        message,
        id: "123ABC",
        date: new Date().getTime(),
    }

    socket.emit('send-message', payload, (server) => {
        console.log(server);
    });
    // txtMessage.value = '';
    // txtMessage.focus();
});