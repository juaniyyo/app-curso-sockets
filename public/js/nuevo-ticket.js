const lblNuevoTicket = document.getElementById('lblNuevoTicket');
const btnCreate = document.querySelector("button");

const socket = io();

socket.on('connect', () => {
    btnCreate.disabled = false;
});

socket.on('disconnect', () => {
    btnCreate.disabled = true;
});

socket.on('last-ticket', (ultimoTicket) => {
    lblNuevoTicket.innerText = `Ticket ${ultimoTicket}`;
})

btnCreate.addEventListener("click", () => {

    socket.emit('next-ticket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket;
    });
});