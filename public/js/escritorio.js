const lblDesktop = document.querySelector("h1");
const btnAttendant = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlert = document.querySelector(".alert");
const lblPendant = document.querySelector("#lblPendientes");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
    window.location = "index.html";
    throw new Error("El escritorio es necesario");
}

const escritorio = searchParams.get("escritorio");
lblDesktop.innerText = escritorio;

divAlert.style.display = "none";

const socket = io();

socket.on('connect', () => {
    btnAttendant.disabled = false;
});

socket.on('disconnect', () => {
    btnAttendant.disabled = true;
});

socket.on("pendant-ticket", (pendantTicket) => {
    if (pendantTicket === 0) {
        divAlert.style.display = "";
        return lblPendant.innerText = "";
    }
    lblPendant.innerText = pendantTicket;
});

btnAttendant.addEventListener("click", () => {

    socket.emit('attendant-ticket', { escritorio }, ({ ok, ticket }) => {
        if (!ok) {
            lblTicket.innerText = "nadie."
            return divAlert.style.display = "";    
        }

        lblTicket.innerText = `Ticket ${ticket.numero}`;
    });
});
