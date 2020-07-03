const express = require("express");
const port = 3330;
const db = require("./db");

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("mysql conected");
  }
});

const app = express();

//create db
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE mysql_node";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("db created");
      console.log(result);
      res.send("db created");
    }
  });
});
app.get("/createtable_posts", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id)  );";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("table created");
      console.log(result);
      res.send("table");
    }
  });
});

app.get("/addpost", (req, res) => {
  let post = { title: "Post One", body: "body of post one" };
  let sql = "INSERT INTO posts SET ? ";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send("post 1 added");
    }
  });
});

app.listen(port, () => {
  console.log("app running at port " + port);
});
