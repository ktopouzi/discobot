const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content === `${prefix}sallute`) {
        message.channel.send('Hello there!.');
    }

    if (message.content.startsWith(`${prefix}play`)) {
        const url = message.content.split(" ")[1]
        console.log(url)
        if (message.channel.type !== 'text') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
			const stream = ytdl(url ? url : 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ' , { filter: 'audioonly' });
			const dispatcher = connection.play(stream);
            dispatcher.setVolume(0.25);
			dispatcher.on('end', () => voiceChannel.leave());
		});
    }
});

client.login(token);