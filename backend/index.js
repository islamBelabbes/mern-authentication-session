const express = require("express");
const cors = require("cors");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default;
const connectDB = require("./src/config/databaseConnect");
const mongoose = require("mongoose");
const errorHandler = require("./src/middleware/errorHandlerMiddleware");

require("express-async-errors");
require("dotenv").config();
// initialize
const app = express();
app.use(express.json());
// cors
const corsOptions = require("./src/config/corsOptions");
app.use(cors(corsOptions));

// Initialize client.
let redisClient = redis.createClient();
redisClient
  .connect({
    PORT: 23744,
  })
  .catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
});

// session
app.use(
  session({
    name: process.env.SESSION_NAME,
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    rolling: true,
  })
);

// db connect
connectDB();

// routes
const apiPrefix = "/api/v1/";
const authRoute = app.use(apiPrefix, require("./src/api/v1/auth/").Route);
const userRoute = app.use(apiPrefix, require("./src/api/v1/user/").Route);
// 404 route
app.use("*", (req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

// error handler
app.use(errorHandler);

// start server
const PORT = process.env.PORT;
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
