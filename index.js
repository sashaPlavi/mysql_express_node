const express = require("express");
const port = 3330;
const db = require("./db");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

routes(app, db);

app.listen(port, () => {
  console.log("app running at port " + port);
});
