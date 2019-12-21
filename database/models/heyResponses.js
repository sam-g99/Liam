import mongoose from 'mongoose';

const heyResponseSchema = new mongoose.Schema({
  package: {
    type: String,
    unique: true,
    required: true,
  },
  responses: [{
    text: String,
    used: Boolean,
  }],
});
const Response = mongoose.model('HeyResponse', heyResponseSchema);
export default Response;
