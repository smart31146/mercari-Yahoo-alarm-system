const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginUserSchema = new Schema(
  {
    email: { type: String, require: true },
    loginStatus: { type: Number, required: true },
  }
);

const LoginUser = mongoose.model('loginuser', LoginUserSchema);
module.exports = LoginUser;
