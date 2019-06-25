require("dotenv").config();

var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    // password: `${keys.pswd.secret}`,
    // password: process.env.DB_PASS,
    password: keys.pswd.secret,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // connection.end();
    listProducts();
    // promptCustomer();
});

var listProducts = function () {
    connection.query("SELECT * FROM `products`", function (err, res) {
        if (err) throw err;
        // console.log(res);

        for (var i = 0; i < res.length; i++) {
            console.log(" ============================ ");
            console.log("\n ID: " + res[i].item_id);
            console.log(" Product: " + res[i].product_name + "\n");
            console.log(" ============================ ");
        };

        // connection.end();
        promptCustomer();
    });
};

function promptCustomer() {
    connection.query("SELECT * FROM `products`", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "chosenID",
                    type: "rawlist",
                    message: "\n What would you like to order? -- See descriptions above.",
                    choices: function () {
                        var userChoice = [];

                        for (var i = 0; i < res.length; i++) {
                            userChoice.push(res[i].item_id);
                        }

                        return userChoice;
                    }
                },
                {
                    name: "chosenQty",
                    type: "input",
                    message: " \n How many do you want to order?",
                    validate: function () {
                        if (isNaN === false) {
                            return false;
                        }
                        else return true;
                    }
                }
            ])
            .then(function (answer) {
                var qtyOrdered = answer.chosenQty;
                var idOrdered = answer.chosenID;

                checkStock(answer.chosenID, answer.chosenQty);
            });
        // connection.end();
    });
};

function checkStock(id, qty) {
    connection.query("SELECT * FROM `products` WHERE `item_id` = " + id, function (err, res) {
        // console.log(res);
        if (err) throw err;

        if (qty <= res[0].stock_quantity && qty != 0) {
            var cost = qty * res[0].price;
            const dollar = ("$" + cost + ".00");

            console.log(" ============================ ");
            console.log(" \n You're in luck! We have a " + res[0].product_name + " in stock!");
            console.log(" Total Cost: " + dollar + "\n");
            console.log(" ============================ ");

            var query = connection.query(
                "UPDATE `products` SET ? WHERE ?",
                [
                    {
                        stock_quantity: res[0].stock_quantity - qty
                    },
                    {
                        item_id: id
                    }
                ],
                function (err, res) {
                    console.log("");
                    console.log("Thanks for your business!");
                    console.log("");
                    connection.end();
                });
        }
        else {
            console.log(" ============================ ");
            console.log("Sorry, we only have " + res[0].stock_quantity + " in stock.");
            console.log(" ============================ ");
            connection.end();
        };
    })
    // connection.end();
    // listProducts();
};