function formatMessage(username, text) {
  return { username, text, time: Date.now() }; //Hay que formatearlo a hora
}

export default {
  formatMessage,
};
