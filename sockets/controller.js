const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit("last-ticket", ticketControl.ultimo);
    socket.emit("actual-state", ticketControl.ultimos4);
    socket.emit("pendant-ticket", ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) => {
        
        const nextTicket = ticketControl.next();
        callback(nextTicket);
        
        socket.broadcast.emit("pendant-ticket", ticketControl.tickets.length);
        socket.broadcast.emit('next-ticket', payload);
    });

    socket.on('attendant-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                message: "El escritorio es necesario"
            });
        }

        const ticket = ticketControl.attendantTicket(escritorio);

        socket.broadcast.emit("actual-state", ticketControl.ultimos4);
        socket.broadcast.emit("pendant-ticket", ticketControl.tickets.length);
        socket.emit("pendant-ticket", ticketControl.tickets.length);

        if (!ticket) {
            return callback({
                ok: false,
                message: "No hay tickets"
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }
    });
}

module.exports = socketController;