const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
const { token } = require('./config.json');

fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
        // Runs each time the corresponding event is emitted
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        // Using 'rest parameter' syntax, which allows us to represent an indefinite number of arguments as an array
        client.on(eventName, (...args) => eventHandler(client, ...args));
    })
});

client.login(token);