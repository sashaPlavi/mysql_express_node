module.exports = function (app, db) {
  db.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mysql conected");
    }
  });
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

  app.post("/addpost", (req, res) => {
    let title = req.body.title !== "";
    //console.log(title);
    if (req.body.title !== "" && req.body.body !== "") {
      let post = { title: req.body.title, body: req.body.body };
      let sql = "INSERT INTO posts SET ? ";
      let query = db.query(sql, post, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(result);
          res.send(
            "post tilte " + req.body.title + " post body " + req.body.body
          );
        }
      });
    } else {
      res.send({
        message: "required fields are empty",
      });
    }
  });
  app.get("/getposts", (req, res) => {
    let sql = "SELECT * FROM posts";
    let query = db.query(sql, (err, resultS) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resultS);
        res.send("post FECHED :) ");
      }
    });
  });
  app.get("/getpost/:id", (req, res) => {
    let sql = `SELECT * FROM posts WHERE  id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("post FECHED  ");
      }
    });
  });
  app.get("/updatepost/:id", (req, res) => {
    let newTitle = "updated title";
    let sql = `UPDATE posts SET title='${newTitle}' WHERE  id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("post updated  ");
      }
    });
  });
  app.get("/deletepost/:id", (req, res) => {
    let newTitle = "updated title";
    let sql = `DELETE FROM posts WHERE  id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("post DELETED ");
      }
    });
  });
  app.get("/", (req, res) => {
    res.send("hi there ");
  });
  app.post("/", (req, res) => {
    console.log(req.body);

    res.send(req.body.title + " title");
  });
};
