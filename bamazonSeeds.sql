DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(20,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("radio", "electronics", 30.00, 250),
("microwave", "appliances", 50.00, 100),
("laptop", "electronics", 50.00, 100),
("time machine", "imaginary", 0.00, 0),
("pony", "difficult to ship", 2000.00, 2),
("the american dream", "difficult to ship", 5000000000000.00, 10),
("t-shirt", "clothing", 10.00, 10000),
("boots", "clothing", 150.00, 300),
("toaster", "appliances", 50.00, 100),
("unicorn", "imaginary", 0.00, 0)
;

SELECT * FROM products;