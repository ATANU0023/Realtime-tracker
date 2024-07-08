const express = require( "express");
const app = express()
const path = require("path");

const http = require("http");
const socketio  = require ("socket.io");


const server = http.createServer(app)

const io = socketio(server);

io.on("connection", (socket) => {
    socket.on("sendLocation",function (data){
        io.emit("receiveLocation", {id: socket.id, ...data});
    })

    socket.on("disconnect",function(){
        io.emit("userDisconnected", socket.id)
    })
    console.log("connected")
})

app.set("view engine","ejs");
app.use(express.static(path.join( __dirname, "public")))

app.get("/", (req, res) => {
    res.render("index")
})

server.listen(3000);

