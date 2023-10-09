const mongoose = require("mongoose");
const User = require("./src/api/v1/user/index").Model;
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://test:test@cluster0.ojmkb0x.mongodb.net/Auth-session?retryWrites=true&w=majority"
    );
    const data = await User.updateMany({ roles: ["subscriber"] });
    console.log(data);
    await mongoose.connection.close();
    console.log("done !");
  } catch (err) {
    console.log(err);
  }
};
connectDB();
