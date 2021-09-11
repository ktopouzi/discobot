const ytdl = require('ytdl-core');

module.exports = (message) => {
  const url = message.content.split(' ')[1];
  if (message.channel.type !== 'text') return;

  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel) {
    return message.reply('Please join a voice channel first!');
  }

  voiceChannel.join().then((connection) => {
    const stream = ytdl(
      url ? url : 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
      { filter: 'audioonly' }
    );
    const dispatcher = connection.play(stream);
    dispatcher.setVolume(0.25);
    dispatcher.on('end', () => voiceChannel.leave());
  });
};
