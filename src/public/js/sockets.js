const socket = io.connect(); //Se conecta al servidor

socket.on("loadrooms", () => {
  console.log(io.rooms);
});

socket.on("roomUsers", ({ room, users }) => {
  console.log(room);

  console.log(users);
});

socket.on("message", (message) => {
  console.log(message);
});

function joinRoom(username, room) {
  console.log("Se creó una sala nueva");

  socket.emit("joinRoom", { username, room });
}

function sendMessage(msg) {
  socket.emit("chatMessage", msg);
}
