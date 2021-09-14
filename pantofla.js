const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.TOKEN;

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function load(data) {
  const pantofla = await prisma.pantofla.findMany();
}

client.login(token).then(() => {
  console.log('I am ready');
  var guild = client.guilds.get('227010629897027584');
  if (guild && guild.channels.get('886059088511922176')) {
    guild.channels
      .get('886059088511922176')
      .send('Good Morning')
      .then(() => client.destroy());
  } else {
    console.log('nope');
    //if the bot doesn't have guild with the id guildid
    // or if the guild doesn't have the channel with id channelid
  }
  client.destroy();
});
