import {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave,
} from "./utils/users.js";

import { getAllRooms, addRoom, deleteRoom } from "./utils/rooms.js";

import { decryptWord } from "./utils/encryptUsername.js";

export function Sockets(io) {
  io.on("connection", (socket) => {
    //Cuando alguien entra al server...
    console.log("Nuevo cliente conectado " + socket.id);
    //console.log(socket);

    socket.on("client:newConnection", ({ username }) => {
      username = decryptWord(username);
      socket.join("lobby");

      const user = userJoin(socket.id, username); //Crea y agrega el usuario a un array de usuarios.
    });

    socket.on("client:loadRooms", () => {
      socket.emit("server:loadRooms", { rooms: getAllRooms() });
    });

    socket.on("joinRoom", ({ username, room }) => {
      //Cuando alguien entra a una sala

      username = decryptWord(username);

      socket.join(room); //Agrega el socket del usuario a la room

      addRoom(room);

      socket.emit("server:loadRooms", { rooms: getAllRooms() });

      console.log(socket.rooms);

      //socket.emit("loadrooms");

      // socket.emit(
      //   //Emite un mensaje de parte del "indicando" que x usuario ingresó a la sala
      //   "message",
      //   formatMessage("Server", `${user.username} has joined the room`)
      // );

      // io.to(user.room).emit("roomUsers", {
      //   //Le envía el evento "roomUsers" a todos los usuarios de la sala del usuario que ingresó
      //   room: user.room,
      //   users: getRoomUsers(user.room), //Se obtienen los usuarios de la sala
      // });
    });

    socket.on("chatMessage", (msg) => {
      //Cuando llega un mensaje...
      const user = getCurrentUser(socket.id); //Se obtiene el usuario completo que envió el mensaje

      io.to(user.room).emit("message", formatMessage(user.username, msg)); //Se formatea y envía el mensaje
    });

    socket.on("disconnect", () => {
      //Cuando alguien se desconecta del server
      const user = userLeave(socket.id);

      // if (user) {
      //   io.to(user.room).emit(
      //     //Envía un mensaje a todos los usuarios indicando que alguien salió de la sala
      //     "message",
      //     formatMessage("Server", `${user.username} has left the room`)
      //   );
      // }

      // io.to(user.room).emit("roomUsers", {
      //   //Se actualiza la lista de usuarios de la sala.
      //   room: user.room,
      //   users: getRoomUsers(user.room),
      // });
    });
  });
}
