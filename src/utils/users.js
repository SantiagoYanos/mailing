const users = []; //Lista de todos los usuarios conectados

export async function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

export async function getAllUsers() {
  return users;
}

export async function changeRoomUser(id, room) {
  return users.map((user) => {
    if (user.id === id) {
      user.room = room;
    }

    return user;
  });
}

export async function findUser(username) {
  return users.find((user) => {
    return user.username === username;
  });
}

export async function getCurrentUser(id) {
  const encontrar = users.find((user) => {
    return user.id === id;
  });

  return encontrar;
}

export async function userLeave(id) {
  const index = users.findIndex((user) => {
    return user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0]; //Quita y retorna el usuario que se desconectó.
  }
  return null;
}

export async function getRoomUsers(room) {
  return users.filter((user) => {
    return user.room === room;
  });
}
