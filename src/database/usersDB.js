import fs from "fs";

const usersFile = "src/data/users.json";

function getAllUsers() {
  if (fs.existsSync(usersFile)) {
    const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
    return users;
  } else {
    return null;
  }
}

function getOneUser(username) {
  const users = getAllUsers();

  if (!users) {
    return null;
  }

  const findUser = users.find((user) => {
    return user.username === username;
  });

  if (findUser) {
    return findUser;
  } else {
    return null;
  }
}

function addUser(user) {
  if (!user.username || !user.password) {
    return null;
  }

  const lastId = findLastId();

  if (lastId === null) {
    const users = [];

    user.id = 1;

    users.push(user);

    fs.writeFileSync(usersFile, JSON.stringify(users));
  } else {
    const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
    user.id = lastId + 1;
    users.push(user);

    fs.writeFileSync(usersFile, JSON.stringify(users));
  }
}

function findLastId() {
  if (fs.existsSync(usersFile)) {
    const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));

    let max = 0;

    users.forEach((user) => {
      if (user.id > max) {
        max = user.id;
      }
    });

    return max;
  } else {
    return null;
  }
}

export default {
  getAllUsers,
  getOneUser,
  addUser,
};
