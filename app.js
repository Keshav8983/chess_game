const express = require("express");
const socket=require("socket.io");
const http= require("http");
const {Chess} = require("chess.js");
const path= require("path");
const { title } = require("process");

const app= express();

const server = http.createServer(app);
const io= socket(server);

const chess= new Chess();
let players={};
let currentplayer="W";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req, res)=>{
    res.render("index", {title: "Chess Game"});
});

io.on("connection", function(uniqueSocket){
    console.log("connected");

    if(!players.white){
        players.white=uniqueSocket.id;
        uniqueSocket.emit("playerRole", "w");
    }
    else if(!players.black){
        players.black=uniqueSocket.id;
        uniqueSocket.emit("playerRole", "b");
    }
    else{
        uniqueSocket.emit("spectatorRole");
    } 

    uniqueSocket.on("disconnect", function() {
        if(uniqueSocket.id === players.white){
            delete players.white;
        }
        else if(uniqueSocket.id === players.black){
            delete players.black;
        }
    });

    uniqueSocket.on("move", (move)=>{
        try{
            if (currentplayer === "w" && uniqueSocket.id !== players.white) return;
            if (currentplayer === "b" && uniqueSocket.id !== players.black) return;

            const result = chess.move(move);

            if(result){
                currentplayer = chess.turn();
                io.emit("move", move);
                io.emit("boardstate", chess.fen());
            }else{
                console.log("Invalid move: ", move);
                uniqueSocket.emit("InvalidMove", move);
            }
        }
        catch(err){
            console.log(err);
            uniqueSocket.emit("Invalid move: ", move);
        }
    })
});

server.listen(3000, function (){
    console.log("Server is running on port 3000");
});