var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var router = require("./routes");
var session = require("express-session");

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("method-override")());
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "adam",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

app.use(router);

var server = app.listen(process.env.PORT || 5000, () => {
  console.log("Listening on port " + server.address().port);
});
