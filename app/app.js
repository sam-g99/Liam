require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();
const fs = require('fs');

const { BOT_TOKEN } = process.env;

const prefix = '!';
// This holds all the commands from the /command folder
const commands = [];


const normalizedPath = require('path').join(__dirname, 'commands');

fs.readdirSync(normalizedPath).forEach((file) => {
  const { name, func, desc } = require(`./commands/${file}`);
  // Injecting the commands from the folder with all the information for the command
  const commandObject = {
    name,
    func,
    desc,
    command: `${prefix}${name.toLocaleLowerCase().replace(/\s/g, '')}`,
  };
  commands.push(commandObject);
});

client.login(BOT_TOKEN);

client.on('ready', () => {
  console.log('Bot is online. :-)');
});


client.on('message', async (msg) => {
  if (msg.content.split('')[0] !== prefix) { return; } // Check for prefix

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

  // All the other commands
  const c = commands.find(({ command }) => command === content.split(' ')[0]);

  if (c) {
    c.func(msg, content, client);
  } else {
    console.log('command not found');
  }
});
