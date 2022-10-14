const rooms = new Set();

rooms.add("lobby");

export function getAllRooms() {
  return rooms;
}

export function addRoom(roomName) {
  rooms.add(roomName);
}

export function deleteRoom(roomName) {
  rooms.delete(roomName);
}
