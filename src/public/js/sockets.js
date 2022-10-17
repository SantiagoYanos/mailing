const socket = io.connect(); //Se conecta al servidor

//------------------------------------------------------ Carga la lista de salas (Cuando carga la pantalla en un principio)

socket.emit("client:loadRooms");

//------------------------------------------------------ Carga la lista de salas

socket.on("server:loadRooms", ({ rooms }) => {
  loadRoomList(rooms);
});

//----------------------------------------------------- Actualiza la lista de usuarios de la sala

socket.on("server:roomUsers", ({ room, users }) => {
  UpdateUserList(users);
});

//--------------------------------------------------- Recibir un mensaje

socket.on("server:message", (message) => {
  newMessage(message);
});

//------------------------------------------------------ Se ejecuta cuando alguien ingresa al servidor.

function newConnection(username) {
  socket.emit("client:newConnection", { username });
}

//--------------------------------------------------- Crear una sala nueva

function joinRoom(room) {
  console.log("Se creó una sala nueva");

  socket.emit("client:joinRoom", { room });
}

//--------------------------------------------------- Salir de una sala

function leaveRoom() {
  socket.emit("client:leaveRoom");
}

//-------------------------------------------------- Enviar nuevo mensaje

function sendMessage(msg) {
  socket.emit("client:chatMessage", msg);
}
