const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

let payload;

async function save(data) {
  const pantofla = await prisma.pantofla.create({
    data,
  });
}

async function load() {
  const pantofla = await prisma.pantofla.groupBy({
    by: ['user', 'userId'],
    _count: {
      _all: true,
      user: true,
    },
  });
  payload = pantofla;
}

module.exports = {
  name: 'voiceStateUpdate',
  async execute(oldState, newState, client) {
    // grab the guild -> Disco 227010629897027584
    const guild = client.guilds.cache.get('227010629897027584');

    // grab the channel -> 🔒admins 800770002365055026 / test 886059088511922176
    const channel = client.channels.cache.get('886059088511922176');

    // grab the role DJ -> 477107211726749697
    const djs = guild.roles.cache.get('477107211726749697');

    if (guild && channel) {
      if (newState.selfMute && !oldState.selfMute) {
        if (!!djs.members.get(newState.id)) {
          const user = client.users.cache.get(newState.id);

          channel.send(`${user.username} πάλι mute ε; :thong_sandal:`);

          const data = {
            user: user.username,
            date: new Date().toISOString(),
            userId: user.id,
          };
          save(data);
        }
      }
      // TODO move to a separate file
      // else {
      //   await load();
      //   payload.sort((a, b) => b._count._all - a._count._all);
      //   console.log(payload);
      //   channel.send(`Το βραβείο παντόφλας της ημέρας πάει στον.....`);
      //   channel.send(
      //     `${JSON.stringify(payload[0].user)} με ${JSON.stringify(
      //       payload[0]._count._all
      //     )} mute`
      //   );
      //   channel.send(`Ακολουθούν.....`);
      //   payload.forEach((element, i) => {
      //     if (i !== 0) {
      //       channel.send(`${element.user} με ${element._count._all}`);
      //     }
      //   });
      // }
    }
  },
};
