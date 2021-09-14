module.exports = {
  name: 'messageUpdate',
  execute(oldMessage, newMessage, client) {
    console.log(oldMessage);
    console.log(newMessage);
    console.log(client);
  },
};
