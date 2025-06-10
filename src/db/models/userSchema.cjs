const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum: ['private', 'group', 'supergroup', 'channel'],    
    required: true
  }
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel
