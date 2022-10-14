const rooms = new Set();

export function getAllRooms() {
  return Array.from(rooms);
}

export function addRoom(roomName) {
  rooms.add(roomName);
}

export function deleteRoom(roomName) {
  rooms.delete(roomName);
}
