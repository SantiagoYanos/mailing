export default (io) => {
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");
    //console.log(socket);
  });
};
