const dotenv = require("dotenv");
dotenv.config();
const {Client} = require('pg')
const { DB_HOST, DB_USERNAME, PORT, DB_PASSWORD } = process.env;
const client = new Client({
    host: DB_HOST,
    user: DB_USERNAME,
    port: PORT,
    password: DB_PASSWORD ,
    database: "post_experiment"
})
client.connect();


let product = [];
let cart_item = [];
let shopping_session = [];
let order_item = [];
let users = [];
let order_details = [];
let payment_details = []

for (let i = 0; i < 1; i++) {
  product.push(product_table(i));
  cart_item.push(cart_item_table(i));
  shopping_session.push(shopping_session_table(i));
  order_item.push(order_item_table(i));
  users.push(users_table(i));
  order_details.push(order_details_table(i));
  payment_details.push(payment_details_table(i));
}

function product_table(index) {
  return {
    "product_id":index,
    "product_name": "GTX_" + index,
    "product_type": "Graphics_Card",
    "quantity": Math.floor(interval(1, 500)),
    "category_id": flist([1, 2, 3, 4, 6, 8, 12, 16, 24, 64]),
    "inventory_id": Math.floor(interval(250, 1800)),
    "price": Math.floor(Math.random() * 200),
    "discount_id": Math.floor(interval(1, 500)),
    "created_at": randomDate(new Date(2012, 0, 1), new Date()),
    "modified_at": randomDate(new Date(2012, 0, 1), new Date()),
    "deleted_at": randomDate(new Date(2012, 0, 1), new Date())
    
  };
}

function cart_item_table(index) {
    return {
      "cart_id":index,
      "session_id":index,
      "product_id":index,
      "quantity": Math.floor(interval(1, 500)),
      "created_at": randomDate(new Date(2012, 0, 1), new Date()),
      "modified_at": randomDate(new Date(2012, 0, 1), new Date())
    };
  }
function order_item_table(index) {
    return {
      "order_id":index,
      "product_id":index,
      "quantity": Math.floor(interval(1, 500)),
      "created_at": randomDate(new Date(2012, 0, 1), new Date()),
      "modified_at": randomDate(new Date(2012, 0, 1), new Date())
    };
  }

function order_details_table(index) {
    return {
      "order_id":index,
      "user_id":index,
      "total":Math.floor(interval(1, 500)),
      "payment_id": index,
      "created_at": randomDate(new Date(2012, 0, 1), new Date()),
      "modified_at": randomDate(new Date(2012, 0, 1), new Date())
    };
}
function payment_details_table(index) {
    return {
      "payment_id":index,
      "order_id":index,
      "amount":Math.floor(interval(1, 500)),
      "provider": "Evaly",
      "status":"active",
      "created_at": randomDate(new Date(2012, 0, 1), new Date()),
      "modified_at": randomDate(new Date(2012, 0, 1), new Date())
    };
}

function shopping_session_table(index) {
    return {
      "shopping_session_id":index,
      "user_id":index,
      "total":Math.floor(interval(1, 500)),
      "created_at": randomDate(new Date(2012, 0, 1), new Date()),
      "modified_at": randomDate(new Date(2012, 0, 1), new Date())
    };
}

function users_table(index) {
    return {
      "user_id":index,
      "username":"user"+index,
      "password_type":"kamrul@#0004",
      "firstname": "Abcdef",
      "lastname":"Ghijk",
      "address":"active",
      "telephone":parseInt("0199532639"+index),
      "created_at": randomDate(new Date(2012, 0, 1), new Date()),
      "modified_at": randomDate(new Date(2012, 0, 1), new Date())
    };
}


function interval(min,max ) {
    return (Math.random()*(max - min)) + min ;

}
function flist(list) {
    return list[Math.floor(Math.random()* list.length)];
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const before = new Date();
console.log(order_item)

client.query(
    `INSERT INTO product (product_id,product_name,product_type,quantity,category_id,inventory_id,price,discount_id,
      created_at,modified_at,deleted_at
  )
  
     SELECT product_id,product_name,product_type,quantity,category_id,inventory_id,price,discount_id,created_at,
     modified_at,deleted_at FROM jsonb_to_recordset($1::jsonb) AS t (product_id int,product_name varchar,product_type varchar,
     quantity int,category_id int,inventory_id int,price decimal,discount_id int,created_at timestamp,modified_at timestamp,deleted_at timestamp
  )`,
    [
        JSON.stringify(product),
    ]
  )


client.query(
    `INSERT INTO cart_item (cart_id,session_id,product_id,quantity,created_at,modified_at
  )
  
     SELECT cart_id,session_id,product_id,quantity,created_at,modified_at FROM jsonb_to_recordset($1::jsonb) AS t (cart_id int,session_id int, product_id int,
     quantity int,created_at timestamp,modified_at timestamp
  )`,
    [
        JSON.stringify(cart_item),
    ]
)


client.query(
    `INSERT INTO order_item (order_id,product_id,quantity,created_at,modified_at
  )
  
     SELECT order_id,product_id,quantity,created_at,modified_at FROM jsonb_to_recordset($1::jsonb) AS t (order_id int, product_id int,
     quantity int,created_at timestamp,modified_at timestamp
  )`,
    [
        JSON.stringify(order_item),
    ]
  )


client.query(
    `INSERT INTO order_details (order_id,user_id,total,payment_id,created_at,modified_at
  )
  
     SELECT order_id,user_id,total,payment_id,created_at,modified_at FROM jsonb_to_recordset($1::jsonb) AS t (order_id int, user_id varchar,
     total decimal,payment_id int,created_at timestamp,modified_at timestamp
  )`,
    [
        JSON.stringify(order_details),
    ]
  )


client.query(
    `INSERT INTO payment_details (payment_id,order_id,amount,provider,status,created_at,modified_at
  )
  
     SELECT payment_id,order_id,amount,provider,status,created_at,modified_at FROM jsonb_to_recordset($1::jsonb) AS t (payment_id int, order_id int, amount int,
     provider varchar,status varchar,created_at timestamp,modified_at timestamp
  )`,
    [
        JSON.stringify(payment_details),
    ]
)

client.query(
    `INSERT INTO user_table (user_id,username,password_type,firstname,lastname,address,telephone,created_at,modified_at
  )
  
     SELECT user_id,username,password_type,firstname,lastname,address,telephone,created_at,modified_at FROM jsonb_to_recordset($1::jsonb) AS t (user_id int, username varchar, password_type varchar,
     firstname varchar, lastname varchar,address varchar,telephone int,created_at timestamp,modified_at timestamp
  )`,
    [
        JSON.stringify(users),
    ]
)


client.query(
    `INSERT INTO shopping_session (shopping_session_id,user_id,total,created_at,modified_at
  )
  
     SELECT shopping_session_id,user_id,total,created_at,modified_at FROM jsonb_to_recordset($1::jsonb) AS t (shopping_session_id int, user_id int,total int,
     created_at timestamp,modified_at timestamp
  )`,
    [
        JSON.stringify(shopping_session),
    ]
)

client.query("Select quantity from product");
client.query("SELECT product.product_name, product.product_type, cart_item.session_id FROM product INNER JOIN cart_item ON product.product_id=cart_item.product_id");
client.query("SELECT product.product_name, product.product_type, order_item.order_id FROM product INNER JOIN order_item ON product.product_id=order_item.product_id")
client.query("SELECT product.product_name, product.product_type, order_item.order_id,order_details.payment_id FROM product INNER JOIN order_item ON product.product_id=order_item.product_id INNER JOIN order_details ON order_item.order_id = order_details.order_id")
client.query("SELECT product.product_name, product.product_type, order_item.order_id, order_details.payment_id FROM product INNER JOIN order_item ON product.product_id=order_item.product_id INNER JOIN order_details ON order_item.order_id = order_details.order_id INNER JOIN payment_details ON order_details.payment_id = payment_details.payment_id")
client.query("SELECT product.product_name, product.product_type, order_item.order_id,order_details.payment_id, payment_details.provider FROM product INNER JOIN order_item ON product.product_id=order_item.product_id INNER JOIN order_details ON order_item.order_id = order_details.order_id INNER JOIN payment_details ON order_details.payment_id = payment_details.payment_id WHERE product.product_name = 'GTX_0'")
console.log(new Date() - before);
client.query("DELETE FROM product")
client.query("DELETE FROM cart_item")
client.query("DELETE FROM order_item")
client.query("DELETE FROM shopping_session")
client.query("DELETE FROM user_table")
client.query("DELETE FROM order_details")
client.query("DELETE FROM payment_details")
client.query("UPDATE product SET gpu_type = 'GraphicsX4_Card'");
client.end;










// CREATE TABLE product(
//     product_id int PRIMARY KEY,
//     product_name varchar NOT NULL,
//     product_type varchar NOT NULL,
//     quantity int NOT NULL,
//     category_id int NOT NULL,
//     inventory_id int NOT NULL,
//     price decimal NOT NULL,
//     discount_id int NOT NULL,
//     created_at timestamp NOT NULL,
//     modified_at timestamp NOT NULL,
//     deleted_at timestamp NOT NULL
// )

// CREATE TABLE Cart_item(
//     cart_id int NOT NULL PRIMARY KEY,
//     session_id int NOT NULL,
//     product_id int NOT NULL,
//     quantity int NOT NULL,
//     created_at timestamp NOT NULL,
//     modified_at timestamp NOT NULL, 
//       FOREIGN KEY (product_id)
//       REFERENCES product (product_id)
// )


// CREATE TABLE order_item(
//     order_id int NOT NULL PRIMARY KEY,
//     product_id int NOT NULL,
//     quantity int NOT NULL,
//     created_at timestamp NOT NULL,
//     modified_at timestamp NOT NULL, 
//       FOREIGN KEY (product_id)
//       REFERENCES product (product_id)
// )


// CREATE TABLE order_details(
//     id int NOT NULL PRIMARY KEY,
// 	user_id varchar NOT NULL, 
//     total decimal NOT NULL,
//     payment_id int NOT NULL,
//     created_at timestamp NOT NULL,
//     modified_at timestamp NOT NULL, 
//       FOREIGN KEY (id)
//       REFERENCES order_items (order_id)
// 	  FOREIGN KEY (user_id)
//       REFERENCES user (id)
// )

// CREATE TABLE user_table (
//     user_id int NOT NULL PRIMARY KEY,
//     username varchar NOT NULL, 
//     password_type text NOT NULL,
//     firstname varchar NOT NULL,
//     lastname varchar NOT NULL,
//     address varchar NOT NULL,
//     telephone int NOT NULL,
//     created_at timestamp NOT NULL,
//     modified_at timestamp NOT NULL 
// )


// CREATE TABLE shopping_sesssion(
//     shopping_session_id int NOT NULL PRIMARY KEY,
//     user_id int NOT NULL,
//     total int NOT NULL,
//     created_at timestamp NOT NULL,
//     modified_at timestamp NOT NULL, 
//       FOREIGN KEY (user_id)
//       REFERENCES user_table (user_id)
// )


// CREATE TABLE payment_details(
//     payment_id int NOT NULL PRIMARY KEY,
//     order_id int NOT NULL,
//     amount int NOT NULL,
// 	provider varchar NOT NULL,
// 	status varchar NOT NULL,
//     created_at timestamp NOT NULL,
//     modified_at timestamp NOT NULL
// )
