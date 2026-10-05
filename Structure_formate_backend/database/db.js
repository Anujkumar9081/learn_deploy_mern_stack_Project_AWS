const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/db')
  .then(() => {
    console.log("mongodb connected");
  });

const newschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user"
  },
     resetToken: String,
  resetTokenExpiry: Date,
});

let user = mongoose.model("user", newschema);

module.exports = user;