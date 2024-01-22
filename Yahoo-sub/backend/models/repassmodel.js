const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RepassUserSchema = new Schema(
  {
    email: { type: String, require: true },
    approve: { type: Number, required: true },
  }
);

const RepassUser = mongoose.model('repass', RepassUserSchema);
module.exports = RepassUser;
