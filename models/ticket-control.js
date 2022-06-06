const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }
    }

    init() {
        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');
        if (hoy === this.hoy) {
            this.ultimo = ultimo;
            this.tickets = tickets;
            this.ultimos4 = ultimos4;
        } else {
            this.saveDb();
        }
    }

    saveDb() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    next() {
        this.ultimo += 1;
        
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        
        this.saveDb();
        
        return `Ticket ${this.ultimo}`;
    }

    attendantTicket(escritorio) {
        if (this.tickets.length === 0) {
            return false;
        }
        
        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;
        
        this.ultimos4.unshift(ticket);
        
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }
        this.saveDb();
        
        return ticket;
    }
}

module.exports = TicketControl;