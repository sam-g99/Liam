import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true,
  },
});
const User = mongoose.model('User', userSchema);
export default User;