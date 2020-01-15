module.exports.name = 'Ping';

module.exports.abbr = 'p';

module.exports.desc = 'Ping the bot to see how fast it responds.';

module.exports.func = async (msg, content, client) => {
  const message = await msg.channel.send('`Lets see the ping...`');
  message.edit(`\`Ping: ${Math.round((message.createdTimestamp - msg.createdTimestamp) - client.ping)}ms\``);
};
