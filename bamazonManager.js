require("dotenv").config();

var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: keys.pswd.secret,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // connection.end();
    start();
    // promptCustomer();
});

var start = function () {
    connection.query("SELECT * FROM `products`", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "viewAll",
                    type: "list",
                    message: "\n What would you like to do?",
                    choices: ["View all inventory", "View low inventory", "Add to inventory", "Add new product"]
                }
            ])
            .then(function (answer) {
                if (answer.viewAll === "View all inventory") {
                    allInv();
                }
                if (answer.viewAll === "View low inventory") {
                    lowInv();
                }
                if (answer.viewAll === "Add to inventory") {
                    addInv();
                }
                if (answer.viewAll === "Add new product") {
                    newProd();
                }
                else {
                    connection.end();
                }
            });
    });
};

function allInv() {
    connection.query("SELECT * FROM `products`", function(err, res) {
        //.
    })
};

function lowInv() {
    connection.query("...", function(err, res) {
        //.
    })
};

function addInv() {
    connection.query("...", function(err, res) {
        //.
    })
};

function newProd() {
    connection.query("...", function(err, res) {
        //.
    })
};
