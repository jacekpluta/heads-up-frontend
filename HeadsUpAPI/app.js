const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const session = require("express-session");
const app = express();
var router = express.Router();

//Passport config
require("./config/passport")(passport);

//express session
app.use(session({ secret: "secret", resave: true, saveUnintialized: true }));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//.env config
require("dotenv/config");

// import routes
const indexRouter = require("./routes/index");
const registerRouter = require("./routes/Register");
const loginRouter = require("./routes/Login");
const userRouter = require("./routes/User");
const incorrectRouter = require("./routes/incorrect");
const logoutRouter = require("./routes/Logout");
var herosRoutes = require("./routes/CategoriesRoutes");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//router middleware
app.use("/", indexRouter);
app.use("/Register", registerRouter);
app.use("/Login", loginRouter);
app.use("/Logout", logoutRouter);
app.use("/Incorrect", incorrectRouter);
app.use("/User", userRouter);

// use express router
app.use("/api/category", router);

//call heros routing
herosRoutes(router);

//parse request of content/type - application/json
app.use(bodyParser.json());

//parse request of content/type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render("error");
});

//database conection
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    // useUnifiedTopology: true,
  },
  () => {
    console.log("connected");
  }
);

module.exports = app;
