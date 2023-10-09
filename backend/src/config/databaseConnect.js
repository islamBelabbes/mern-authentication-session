const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
