const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new Schema({
  description: {
    type: String,
    required: true,
    default: null,
  }
});

module.exports = mongoose.model("user", userSchema);
