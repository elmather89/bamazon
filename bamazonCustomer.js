require("dotenv").config();

var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");

var chosenUserProduct = "";

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
    // listProducts();
    promptCustomer();
});

function listProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);

        for (var i = 0; i < res.length; i++) {
            console.log(" ============================ ");
            console.log("\n ID: " + res[i].item_id);
            console.log(" Product: " + res[i].product_name + "\n");
            console.log(" ============================ ");
        };

        connection.end();
        promptCustomer();
    });
};

function promptCustomer() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        inquirer
        .prompt([
            {
                name: "chosenID",
                type: "rawlist",
                message: "What is the ID of the product you would like to order?",
                choices: function() {
                    var userChoice = [];

                    for (var i = 0; i < res.length; i++) {
                        userChoice.push(res[i].product_name);
                    }

                    return userChoice;
                }
            },
            {
                name: "chosenQty",
                type: "input",
                message: "How many do you want to order?",
                // validate: function() {
                //     if (isNaN === false) {
                //         return true;
                //     }
                //     else return false;
                // }
            }
        ])
        .then(function(chosenProduct) {

                console.log("\n Validating your order............");
                console.log("*************************************************");
                console.log(" Item: " + chosenProduct.chosenID);
                console.log(" Unique ID: " + chosenProduct.userChoiceID);
                console.log(" Qty: " + chosenProduct.chosenQty);
                console.log("*************************************************");
                // howMany();         
                
                // validate input 
                // do we have enough in stock && was a legitimate item id entered
        });

    });
};