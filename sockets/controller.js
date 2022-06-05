const socketController = (socket) => {   
    
    console.log("Cliente conectado", socket.id);
    
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });

    socket.on('send-message', (payload, callback) => {
        const id = 123456;
        callback({ id: id, fecha: new Date().getTime() });
        socket.broadcast.emit('send-message', payload);
    });
}

module.exports = socketController;