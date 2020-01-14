const mongoose = require('mongoose');

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
