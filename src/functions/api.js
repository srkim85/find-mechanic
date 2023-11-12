const jsonServer = require("json-server");
const express = require("express");
const server = express();
const router = jsonServer.router("../../data/mechanics.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use("/api", router); // Assuming you want your API available at '/api'

module.exports = server;
