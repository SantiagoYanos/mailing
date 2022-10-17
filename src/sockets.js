import {
  userJoin,
  getCurrentUser,
  getAllUsers,
  getRoomUsers,
  userLeave,
  changeRoomUser,
  findUser,
} from "./utils/users.js";

import { formatMessage } from "./utils/messages.js";

import { getAllRooms, addRoom, deleteRoom } from "./utils/rooms.js";

import { decryptWord } from "./utils/encryptUsername.js";

import { logMessage } from "./utils/logs.js";

export function Sockets(io) {
  //--------------------------------------------------------------------------------------------------------- Cuando alguien se conecta...

  io.on("connection", (socket) => {
    //Cuando alguien entra al server...
    console.log("Nuevo cliente conectado " + socket.id);
    //console.log(socket);

    socket.on("client:newConnection", async ({ username }) => {
      username = decryptWord(username);
      socket.join("lobby");

      let exists = await findUser(username);

      if (exists) {
        await userLeave(exists.id);
      }

      const user = userJoin(socket.id, username, "lobby"); //Crea y agrega el usuario a un array de usuarios.
      socket.emit("server:loadRooms", { rooms: await getAllRooms() });
    });

    //----------------------------------------------------------------------------------------------------- Enviar la lista de salas

    socket.on("client:loadRooms", async () => {
      socket.emit("server:loadRooms", { rooms: await getAllRooms() });
    });

    //----------------------------------------------------------------------------------------------------- Agregar un usuario a una sala

    socket.on("client:joinRoom", async ({ room }) => {
      //Cuando alguien entra a una sala

      let user = await getCurrentUser(socket.id);

      if (user) {
        socket.leave("lobby");
        socket.join(room); //Agrega el socket del usuario a la room

        await addRoom(room);

        await changeRoomUser(socket.id, room);

        const welcomeMessage = formatMessage(
          "Server",
          `${user.username} has joined the room`
        );

        io.to(room).emit(
          //Emite un mensaje de parte del Server "indicando" que x usuario ingresó a la sala
          "server:message",
          welcomeMessage
        );

        logMessage(welcomeMessage, room);

        io.to(room).emit("server:roomUsers", {
          //Le envía el evento "roomUsers" a todos los usuarios de la sala del usuario que ingresó
          room: room,
          users: await getRoomUsers(room), //Se obtienen los usuarios de la sala
        });

        io.to("lobby").emit("server:loadRooms", { rooms: await getAllRooms() });
      } else {
        console.log("EL USUARIO NO EXISTE!!");
      }
    });

    //------------------------------------------------------------------------------------------------------- Emitir un mensaje a todos los integrantes de una sala

    socket.on("client:chatMessage", async (msg) => {
      //Cuando llega un mensaje...
      const user = await getCurrentUser(socket.id); //Se obtiene el usuario completo que envió el mensaje

      if (user) {
        const message = formatMessage(user.username, msg);

        io.to(user.room).emit("server:message", message); //Se formatea y envía el mensaje

        logMessage(message, user.room);
      }
    });

    //------------------------------------------------------------------------------------------------------- Si alguien sale de una sala...

    socket.on("client:leaveRoom", async () => {
      const user = await getCurrentUser(socket.id);

      if (user) {
        const oldRoom = user.room;

        socket.leave(oldRoom);
        socket.join("lobby");

        await changeRoomUser(socket.id, "lobby");

        console.log(await getAllUsers());

        const roomUsers = await getRoomUsers(oldRoom);

        if (roomUsers.length <= 0) {
          await deleteRoom(oldRoom);
          console.log("Room Eliminada");
        }

        const leftMessage = formatMessage(
          "Server",
          `${user.username} has left the room`
        );

        io.to(oldRoom).emit(
          //Emite un mensaje de parte del Server "indicando" que x usuario abandonó a la sala
          "server:message",
          leftMessage
        );

        logMessage(leftMessage, oldRoom);

        io.to(oldRoom).emit("server:roomUsers", {
          //Le envía el evento "roomUsers" a todos los usuarios de la sala del usuario que ingresó
          room: oldRoom,
          users: await getRoomUsers(oldRoom), //Se obtienen los usuarios de la sala
        });

        io.to("lobby").emit("server:loadRooms", { rooms: await getAllRooms() });
      } else {
        console.log("EL USUARIO NO EXISTE!!");
      }
    });

    //------------------------------------------------------------------------------------------------------- Cuando alguien se desconecta

    socket.on("disconnect", async () => {
      console.log(socket.id + " se desconectó!");
      //Cuando alguien se desconecta del server
      const user = await userLeave(socket.id);

      if (user) {
        const oldRoom = user.room;

        const leftMessage = formatMessage(
          "Server",
          `${user.username} has left the room`
        );

        if (oldRoom != "lobby") {
          io.to(oldRoom).emit(
            //Envía un mensaje a todos los usuarios indicando que alguien salió de la sala
            "server:message",
            leftMessage
          );

          logMessage(leftMessage, oldRoom);

          const roomUser = await getRoomUsers(oldRoom);

          if (roomUser.length <= 0) {
            await deleteRoom(oldRoom);
            console.log("Room Eliminada");
          }

          io.to(oldRoom).emit("server:roomUsers", {
            //Se actualiza la lista de usuarios de la sala.
            room: oldRoom,
            users: await getRoomUsers(oldRoom),
          });
        }

        io.to("lobby").emit("server:loadRooms", {
          rooms: await getAllRooms(),
        });
      }
    });
    //-------------------------------------------------------------------------------------------------------
  });
}
