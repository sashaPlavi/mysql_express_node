const express = require("express");
const port = 3330;
const db = require("./db");

const app = express();

require("./routes")(app, db);

app.listen(port, () => {
  console.log("app running at port " + port);
});
