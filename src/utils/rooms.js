const rooms = new Set();

export async function getAllRooms() {
  return Array.from(rooms);
}

export async function addRoom(roomName) {
  rooms.add(roomName);

  return roomName;
}

export async function deleteRoom(roomName) {
  rooms.delete(roomName);

  return roomName;
}
