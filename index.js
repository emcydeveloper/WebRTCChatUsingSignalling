const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const dotenv = require("dotenv");
dotenv.config();

// const PORT = 3000;
// console.log(process.env.PORT);
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/join", (req, res) => {
  res.sendFile(__dirname + "/join.html");
});

i = 0;

io.on("connection", (socket) => {
  i++;

  socket.emit("NewUser", `Users ID - ${i}`);

  //Offer handling. Received OFFER from PC-A and sent to PC-B
  socket.on("SendOffer", (offerfromA) => {
    console.log(`Offer from A - ${offerfromA}`);
    socket.broadcast.emit("offerFromAtoB", `${offerfromA}`);
  });

  socket.on("sendAnswer", (answerFromB) => {
    console.log(`Printing Answer of B - ${answerFromB}`);
    socket.broadcast.emit("answerFromBtoA", `${answerFromB}`);
  });
  socket.on("sendCandidateA", (candidateFromA) => {
    console.log(`Printing Candidate A - ${candidateFromA}`);
    socket.broadcast.emit("candidateFromAtoB", `${candidateFromA}`);
  });

  socket.on("sendCandidateB", (candidateFromB) => {
    console.log(`Printing Candidate B - ${candidateFromB}`);
    socket.broadcast.emit("candidateFromBtoA", `${candidateFromB}`);
  });
});

//sendCandidateB

//answerFromBtoA
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
