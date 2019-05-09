require("dotenv").config();

var keys = require("./keys.js");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    // password: `${keys.pswd.secret}`,
    // password: keys.pswd.secret,
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
});

afterConnect();

function afterConnect() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};