const RandomCommand = require('../../database/models/randomCommand');

module.exports.name = 'Create Random';

module.exports.abbr = 'cr';

module.exports.desc = 'Create a command and add random responses';

module.exports.func = async (msg, content, client) => {
  // Make sure command exist
  const newCommand = content.split(' ')[1];
  if (!newCommand) {
    msg.reply('Please set a command `!createrandom {newcommand}`');
    return;
  }
  // Check if command exist in this server already (TODO: and isn't a bto command already)
  const commandExist = await RandomCommand.countDocuments({ serverId: msg.guild.id, command: newCommand });
  console.log(commandExist);
  if (commandExist > 0) {
    msg.channel.send('**that command already exist here!**');
    return;
  }
  RandomCommand.create({ serverId: msg.guild.id, command: newCommand });

  msg.reply(`Please send the random items to bind to !${newCommand}.`);

  const filter = async (m, r) => {
    if (m.author.bot) return;
    // TODO fix this thingie later
    const Command = await RandomCommand.findOne({ serverId: msg.guild.id, command: newCommand });
    Command.responses.push(m.content);
    Command.save();

    if (m.content === '!cancel') {
      return true;
    }
  };

  const response = msg.channel.createMessageCollector(filter, { time: 10000000, maxMatches: 300 });
  response.on('collect', (m) => {
    if (m.content === '!cancel') {
      response.stop();
    }
  });

  response.on('end', (responses) => {
    const courseData = responses.map((m) => m.content);
    const authorId = responses.map((m) => m.author.id);
    if (courseData.length < 3) {
      msg.channel.send('**Cancelled**');
    }
  });
};
