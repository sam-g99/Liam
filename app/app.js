require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const BOT_TOKEN = process.env.BOT_TOKEN;

const commands = [];

const normalizedPath = require("path").join(__dirname, "commands");

fs.readdirSync(normalizedPath).forEach(function(file) {
  const {name, func, desc} = require("./commands/" + file);
  const commandObject = {
      name,
      func,
      desc
  }
  commands.push(commandObject);
});

client.login(BOT_TOKEN);

client.on('ready', () => {
    console.log('Bot is online.');
})

const prefix = '!';

client.on('message', async msg => {
    const content = msg.content.toLocaleLowerCase();
    if (content.split('')[0]  !== '!'){ return } // Check for !

    const command = commands.find(({name}) => prefix + name.toLocaleLowerCase() === content.split(' ')[0]);
    
    if(command){
        command.func(msg, content, client);
    } else {
        console.log('command not found');
    }
})
