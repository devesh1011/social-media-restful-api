const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const connectDB = require("./config/db");
require("dotenv").config();
require("./config/passport");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "hello",
  })
);
app.use(passport.initialize());

app.use("/api/auth", authRoute); // auth route
app.use("/api/users", userRoute); // user route
app.use("/api/posts", postRoute); // post route

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.listen(process.env.PORT, () => {
  connectDB(process.env.DB_URI);

  console.log(`Server listening http://localhost:${process.env.PORT}`);
});
