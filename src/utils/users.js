const users = []; //Lista de todos los usuarios conectados

export function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

export function getCurrentUser(id) {
  return users.find((user) => {
    user.id === id;
  });
}

export function userLeave(id) {
  const index = users.findIndex((user) => {
    user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0]; //Quita y retorna el usuario que se desconectó.
  }
}

export function getRoomUsers(room) {
  return users.filter((user) => {
    user.room === room;
  });
}
