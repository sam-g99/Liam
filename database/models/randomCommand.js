const mongoose = require('mongoose');
require('dotenv').config();

const { BOT_TOKEN, MONGO_URL } = process.env;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const randomCommandSchema = new mongoose.Schema({
  // TODO unique together
  serverId: {
    type: String,
    required: true,
  },
  command: {
    type: String,
    required: true,
  },
  responses: [String],

});
const RandomCommand = mongoose.model('randomCommand', randomCommandSchema);
module.exports = RandomCommand;
