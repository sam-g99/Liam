module.exports.name = 'Hey';

module.exports.abbr = 'h';

module.exports.desc = 'Say hello to Liam, and he\'ll respond back'; // make bot name an env variable

module.exports.func = async (data) => {
  const { msg } = data;
  msg.channel.send('Sup');
};
