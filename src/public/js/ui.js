console.log("Prueba prueba");

console.log("Ui detectada");

//--------------------------------------------------------------------------------------- Nueva conexión...

const usernameInput = document.getElementById("username");
newConnection(usernameInput.value);

//----------------------------------------------------------------------------------------- Cargar listado de salas

function loadRoomList(rooms) {
  let chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = roomListView(rooms);

  const newRoomButton = document.getElementById("newRoom");

  newRoomButton.addEventListener("click", () => {
    const roomName = document.getElementById("roomName");
    joinRoom(roomName.value);
    loadChatRoom();
  });
}

//------------------------------------------------------------------------------------------ Cargar cuadrado de Chat al unirse a una sala

function loadChatRoom() {
  let chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = chatBoxView();

  const newMessageButton = document.getElementById("newMessage");
  const leaveButton = document.getElementById("leaveRoom");

  newMessageButton.addEventListener("click", () => {
    sendMessageButton();
  });

  leaveButton.addEventListener("click", () => {
    leaveRoom();
  });
}

//--------------------------------------------------------------------- Cuando se recibe un nuevo mensaje...

function newMessage(msg) {
  const chatWindow = document.getElementById("messagesWindow");

  chatWindow.innerHTML += "<ul>";

  const message =
    `<li> ${msg.username} - ${msg.time} </li>` + `<li> ${msg.text} </li>`;

  chatWindow.innerHTML += message;

  chatWindow.innerHTML += "</ul>";
}

//-------------------------------------------------------------------- Envío de mensaje a la sala

function sendMessageButton() {
  const messageText = document.getElementById("messageText");

  const text = messageText.value;

  sendMessage(text);
}

//---------------------------------------------------------------------

// function leaveRoomButton() {
//   const leaveButton = document.getElementById("leaveButton");

//   leaveButton
// }
