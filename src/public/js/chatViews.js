function chatBoxView() {
  return `<div class="chatBox">
    
    <div class="chatWindow">

    <ul id="messagesWindow" style="margin: 0px; padding: 15px; list-style-type: 0';">
    </ul>

    </div>

    <div id="userList" class="userList" style="margin-top: 10px">
    
    </div>

    <div style="margin-bottom: 15px">
    
    <input id="messageText" type="textbox" style="vertical-align: bottom; bottom: 0; width:80%; margin-left: 10px"></input>
    
    <a id="newMessage" class="waves-effect waves-light btn purple lighten-1" style="display: inline-block; margin-left: 10px;">Send</a>

    <a id="leaveRoom" class="waves-effect waves-light btn purple darken-3" style="display: inline-block;">Leave Room</a>

    </div>
    
</div>`;
}

function roomListView(rooms) {
  let chatList = `
  
  <div class="input-field inline">
  <input id="roomName" type="text" placeholder="New Room" required></input>
  </div>

  <a id="newRoom" style="margin-left: 25px" class="btn-floating btn-medium waves-effect waves-light purple"><i class="material-icons">add</i></a>
 
  <div class="roomsListInside">
  `;
  chatList += "<ul style='padding: 0; margin-bottom: 10px;'>";

  rooms.forEach((room) => {
    chatList +=
      "<li style='list-style:none;'> <div class='roomListElement'> <h4 style='padding-left: 35px; font-weight: bold; display: inline-block'>" +
      room +
      "</h4>" +
      "<a id=" +
      `'${room}'` +
      "class='waves-effect waves-light btn indexButton purple darken-1' style='display: inline-block; margin-top: 20px; margin-right: 35px; float:right'; vertical-align: middle;>Entrar</a>" +
      "</div> </li>";
  });

  chatList += "</ul>";

  chatList += "</div>";

  return chatList;
}
