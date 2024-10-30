const { Socket } = require('socket.io');
const { io } = require('../server'); // io is an instance of socket server.

const RegisterSockets = () => {
    // private messaging.
    io.on('connection', (socket) => {
        console.log(`User ${socket.id} connected...`);

        // Listen for private messages sent from client.
        socket.on('send-message', (msg) => {
            // emit the received message to all connneted clients.
            socket.emit('broadcast', msg);
            console.log(msg);
        });

        // Listen for disconnect events from client.
        socket.on('disconnect', () => {
            socket.disconnect();
            console.log(`User ${socket.id} disconnected`);
        });

    });
};

module.exports = RegisterSockets;