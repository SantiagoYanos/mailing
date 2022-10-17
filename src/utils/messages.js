export function formatMessage(username, text) {
  let time = new Date(Date.now());

  let formattedTime = "";

  time.getDate();

  formattedTime = `${time.getDate()}/${
    time.getMonth() + 1
  }/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;

  return { username, text, time: formattedTime }; //Hay que formatearlo a hora
}
