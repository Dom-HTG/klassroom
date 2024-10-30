// Initializes a socket server mounted on a HTTP server instance with express.
// Exports the app & io servers respectively.

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();

const httpServer = http.createServer(app); //pass instance of express server.
const io = new socketIO.Server(httpServer);

module.exports = { app, io };