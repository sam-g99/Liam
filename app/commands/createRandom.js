module.exports.name = 'Create Random';

module.exports.desc = 'Create a command and add random responses';

module.exports.func = async (msg, content, client) => {
  const responses = [];
  const newCommand = content.split(' ')[1];
  if (!newCommand) {
    msg.reply('Please set a command `!createrandom {newcommand}`');
    return;
  }
  msg.reply(`Please send the random items to bind to !${newCommand}.`);

  const filter = (m, r) => {
    console.log(m.content, r);
    if (m.content === '!cancel') {
      return true;
    }
  };

  const response = msg.channel.createMessageCollector(filter, { time: 100000, maxMatches: 3 });
  response.on('collect', (m) => {
    if (m.content === '!cancel') {
      response.stop();
    }
  });

  response.on('end', (responses) => {
    const courseData = responses.map((m) => m.content);
    const authorId = responses.map((m) => m.author.id);
    if (courseData.length < 3) {
      msg.channel.send('**Took too long to respond. Try again.**');
    }
  });
};
