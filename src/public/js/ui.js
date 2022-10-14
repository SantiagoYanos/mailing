console.log("Prueba prueba");

console.log("Ui detectada");

const newRoomButton = document.getElementById("newRoom");
const usernameInput = document.getElementById("username");

newConnection(usernameInput.value);

newRoomButton.addEventListener("click", () => {
  const roomName = document.getElementById("roomName");
  joinRoom(usernameInput.value, roomName.value);
});
