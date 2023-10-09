const allowedOrigins = ["*"];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => callback(null, true),
  // origin: (origin, callback) => {
  //   if (!allowedOrigins.includes(origin) || !origin) {
  //     callback(new Error("Not allowed by CORS"));
  //   } else {
  //     callback(null, true);
  //   }
  // },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
