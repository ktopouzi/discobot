require('dotenv').config();
const kick = require('../commands/kick');
const play = require('../commands/play');
const pantofla = require('../commands/pantofla');
const prefix = process.env.PREFIX;

module.exports = {
  name: 'message',
  execute(message, client) {
    if (message.content === `${prefix}salute`) {
      message.channel.send('Hello there!');
    }

    if (message.content.startsWith(`${prefix}play`)) {
      return play(message);
    }

    if (message.content.startsWith(`${prefix}kick`)) {
      return kick(message);
    }

    if (message.content.startsWith(`${prefix}pantofla`)) {
      return pantofla(message, client);
    }
  },
};
