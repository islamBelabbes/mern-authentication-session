const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri || process.env.DB);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
