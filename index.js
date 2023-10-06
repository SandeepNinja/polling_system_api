const express = require("express");
const port = 8000;
const app = express();
require("dotenv").config();
const db = require("./config/mongoose");

app.use(express.urlencoded());
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error in starting the server", err);
  }
  console.log("!Yep !My express server is running on port", port);
});
