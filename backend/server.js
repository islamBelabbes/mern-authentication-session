const mongoose = require("mongoose");
const CreateServer = require("./app");
const connectDB = require("./src/config/databaseConnect");

const { app } = CreateServer();
connectDB();
// start server
const PORT = process.env.PORT;
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
