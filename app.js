const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

//Parsing mw
app.use(bodyParser.urlencoded({ extended: false }));

//Parse application/json
app.use(bodyParser.json());

//Static files
app.use(express.static("public"));

//Templating engine
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

//Connection Pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//Conncect to DB
pool.getConnection((err, connection) => {
  if (err) throw err; // not connected!
  console.log("connected as id " + connection.threadId);
});

const routes = require("./server/routes/user");
app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
