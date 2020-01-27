const RandomCommand = require('../../database/models/randomCommand');

module.exports.name = 'Create Random';

module.exports.abbr = 'cr';

module.exports.desc = 'Create a command and add random responses';

module.exports.func = async (data) => {
  const {
    msg, content, commands, prefix,
  } = data;
  console.log(commands);

  const newCommand = content.split(' ')[1];

  if (!newCommand) {
    msg.reply(`Please set a command \`${prefix}createrandom {newcommand}\``);
    return;
  }

  // Check if command exist in this server already
  const commandExist = await RandomCommand.countDocuments({
    serverId: msg.guild.id,
    command: newCommand,
  });

  if (commandExist > 0) {
    msg.channel.send('**that command already exist here!**');
    return;
  }

  const newCommandWithPrefix = `${prefix}${newCommand}`;
  // eslint-disable-next-line max-len
  const isStandardCommand = commands.some(({ command, abbr }) => command === newCommandWithPrefix || abbr === newCommandWithPrefix);

  if (isStandardCommand) {
    msg.channel.send('**That command is already a part of this bot!**');
    return;
  }

  // Create the command
  RandomCommand.create({ serverId: msg.guild.id, command: newCommand });

  msg.reply(`Please send the random items to bind to !${newCommand}.`);


  const filter = async (m, r) => {
    if (m.author.bot) return;
    if (m.content === `${prefix}done`) {
      return true;
    }

    const Command = await RandomCommand.findOne({
      serverId: msg.guild.id,
      command: newCommand,
    });

    Command.responses.push(m.content);
    Command.save().then(() => {
      msg.channel.send('`added`');
    });
  };

  const response = msg.channel.createMessageCollector(filter, { time: 10000000 });

  response.on('collect', (m) => {
    if (m.content === `${prefix}done`) {
      response.stop();
    }
  });

  response.on('end', (responses) => {
    // const courseData = responses.map((m) => m.content);
    // const authorId = responses.map((m) => m.author.id);
    msg.channel.send(`**Done collecting responses for \`${newCommand}\`**`);
  });
};
