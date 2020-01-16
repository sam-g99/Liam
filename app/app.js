require('dotenv').config();

const { BOT_TOKEN, MONGO_URL } = process.env;

const Discord = require('discord.js');

const client = new Discord.Client();
const fs = require('fs');

// DB Connection
const mongoose = require('mongoose');

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const prefix = '!';
// This holds all the commands from the /command folder
const commands = [];


const normalizedPath = require('path').join(__dirname, 'commands');

fs.readdirSync(normalizedPath).forEach((file) => {
  const {
    name, func, desc, abbr,
  } = require(`./commands/${file}`);
  // Injecting the commands from the folder with all the information for the command
  const commandObject = {
    name,
    func,
    desc,
    command: `${prefix}${name.toLocaleLowerCase().replace(/\s/g, '')}`,
    abbr: `${prefix}${abbr.toLocaleLowerCase().replace(/\s/g, '')}`,
  };
  commands.push(commandObject);
});

client.login(BOT_TOKEN);

client.on('ready', () => {
  console.log('Bot is online. :-)');
});

client.on('message', async (msg) => {
  if (msg.author.bot) return; // ignore bots

  if (msg.content.split('')[0] !== prefix) return; // Check for prefix

  const content = msg.content.toLocaleLowerCase();

  // Help command
  if (content === `${prefix}help`) {
    const helpMessage = new Discord.RichEmbed()
      .setColor('#0099ff')
      .setTitle('Commands')
      .setDescription('All of this bots commands')
      .addField(`${prefix}help`, 'View all commands', false);
    commands.forEach(({ command, desc }) => {
      if (command) {
        helpMessage.addField(command, desc, false);
      }
    });
    msg.reply(helpMessage);
    return;
  }

  const data = {
    msg,
    content,
    client,
    commands,
    prefix,
  };

  // the command the user used
  const invoked = content.split(' ')[0];

  // All the other commands
  const c = commands.find(({ command, abbr }) => command === invoked || abbr === invoked);

  if (c) {
    c.func(data);
  } else {
    console.log('command not found');
  }
});
