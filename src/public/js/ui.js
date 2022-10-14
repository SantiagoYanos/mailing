console.log("Prueba prueba");

const newRoomButton = document.getElementById("newRoom");

console.log("Ui detectada");

newRoomButton.addEventListener("click", () => {
  const roomName = document.getElementById("roomName");
  const usernameInput = document.getElementById("username");
  joinRoom(usernameInput.value, roomName.value);
});
