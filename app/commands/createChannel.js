module.exports.name = 'Create Channel';

module.exports.abbr = 'cc';

module.exports.desc = 'Create a channel';

module.exports.func = async (msg, content, client /* rename bot */) => {
  const newChannelName = content.split(' ')[1]; // do a check to see if it is the right format if not add '-'
  const server = msg.guild;
  // Check all channels in discord exist
  const checkIfChannelExist = ({ name }) => name === newChannelName;
  const channelExist = server.channels.some(checkIfChannelExist);
  if (channelExist) {
    msg.reply(`Sorry the channel name \`${newChannelName}\` is taken`);
  } else {
    server.createChannel(newChannelName, 'text');
  }
};
