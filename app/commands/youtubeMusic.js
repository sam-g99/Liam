const ytdl = require('ytdl-core');

function validURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
    + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
    + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
    + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

module.exports.name = 'Youtube Audio Player';

module.exports.abbr = 'ym';


module.exports.desc = 'Play audio from YouTube.';

module.exports.func = async (data) => {
  const { msg } = data;
  const url = msg.content.split(' ')[1].trim();

  const streamOptions = { seek: 0, volume: 1 };
  const { voiceChannel } = msg.member;
  msg.reply('url');
  // async sort of deal here
  voiceChannel.join().then((connection) => {
    console.log('joined channel');
    const stream = ytdl(url, { filter: 'audioonly' });
    const dispatcher = connection.playStream(stream, streamOptions);
    dispatcher.on('end', (end) => {
      msg.reply('I hope you enjoyed your listening session.');
    });
  }).catch((err) => console.log(err));
};
