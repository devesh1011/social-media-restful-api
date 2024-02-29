const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
require("dotenv").config();
require("./config/passport");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session());
app.use(passport.initialize());

app.use("/api/auth", authRoute); // auth route
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server listening https://localhost/${process.env.PORT}`);
});
