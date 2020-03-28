const kick = require("../commands/kick");
const play = require("../commands/play");
const { prefix } = require('../config.json');

module.exports = (client, message) => {
    if (message.content === `${prefix}salute`) {
        message.channel.send('Hello there!');
    }

    if (message.content.startsWith(`${prefix}play`)) {
        return play(message);
    }

    if (message.content.startsWith(`${prefix}kick`)) {
        return kick(message);
    }
}