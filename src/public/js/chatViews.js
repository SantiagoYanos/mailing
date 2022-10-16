function chatBoxView() {
  return `<div style='width: 700px; height: 400px; border-style:solid; border-length: 1cm; border-color:black'>
    
    <div id="chatWindow" style='width: 500px; height: 300px; border-style:solid; border-length: 1cm; border-color:black' >

    <ul id="messagesWindow">
    </ul>

    </div>

    <input id="messageText" type="textbox" style="vertical-align: bottom; bottom: 0"></input>
    <button id="newMessage">Enviar</button>

    <button id="leaveRoom">Abandonar Sala</button>
    
</div>`;
}

function roomListView(rooms) {
  let chatList = `<button id="newRoom">Crear nueva room</button>
  <input id="roomName" type="text" placeholder="Room name"></input>`;

  chatList += "<ol>";

  rooms.forEach((room) => {
    chatList += "<li>" + room + "</li>";
  });

  chatList += "</ol>";

  return chatList;
}
