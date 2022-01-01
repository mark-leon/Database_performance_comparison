const dotenv = require("dotenv");
dotenv.config();


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


console.log(order_item)


let MongoClient = require('mongodb').MongoClient;
let url = process.env.MONGO_URL

MongoClient.connect(url, function(err, db) {
    let dbo = db.db("mongoexperiment");
    let before = new Date();
    dbo.collection("product").insertMany(product);
    dbo.collection("order_item").insertMany(order_item);
    dbo.collection("order_details").insertMany(order_details);
    dbo.collection("payment_details").insertMany(payment_details);
    dbo.collection("mongo").find({}).toArray;
     dbo.collection("product").aggregate([

        // Join with order_items table
        {
            $lookup:{
                from: "order_item",       // other table name
                localField: "product_id",   // name of product table field
                foreignField: "product_id", // name of order_items table field
                as: "order_item"         // alias for order_items table
            }
        },
        {   $unwind:"$order_item" },     // $unwind used for getting data in object or for one record only
    
        {   
            $project:{
                product_name:1,
                product_type:1,
                order_item:"$order_item.order_id",
            } 
        }
    ]);

    dbo.collection("product").aggregate([

        // Join with order_items table
        {
            $lookup:{
                from: "order_item",       // other table name
                localField: "product_id",   // name of product table field
                foreignField: "product_id", // name of order_items table field
                as: "order_item"         // alias for order_items table
            }
        },
        {   $unwind:"$order_item" },// $unwind used for getting data in object or for one record only


        {
            $lookup:{
                from: "order_details",       // other table name
                localField: "order_id",   // name of product table field
                foreignField: "order_id", // name of order_items table field
                as: "order_details"         // alias for order_items table
            }
        },
        {   $unwind:"$order_details" },
       
        {   
            $project:{
                product_name:1,
                product_type:1,
                order_item:"$order_item.order_id",
                payment_id:"$order_details.payment_id"
            } 
        }
    ]);


    dbo.collection("product").aggregate([

        // Join with order_items table
        {
            $lookup:{
                from: "order_item",       // other table name
                localField: "product_id",   // name of product table field
                foreignField: "product_id", // name of order_items table field
                as: "order_item"         // alias for order_items table
            }
        },
        {   $unwind:"$order_item" },// $unwind used for getting data in object or for one record only


        {
            $lookup:{
                from: "order_details",       // other table name
                localField: "order_id",   // name of product table field
                foreignField: "order_id", // name of order_items table field
                as: "order_details"         // alias for order_items table
            }
        },
        {   $unwind:"$order_details" },


        {
            $lookup:{
                from: "payment_details",       // other table name
                localField: "payment_id",   // name of product table field
                foreignField: "payment_id", // name of order_items table field
                as: "payment_details"         // alias for order_items table
            }
        },
        {   $unwind:"$payment_details" },

        {   
            $project:{
                product_name:1,
                product_type:1,
                order_id:"$order_item.order_id",
                payment_id:"$order_details.payment_id"
            } 
        }
    ]);

    dbo.collection("product").aggregate([

        // Join with order_items table
        {
            $lookup:{
                from: "order_item",       // other table name
                localField: "product_id",   // name of product table field
                foreignField: "product_id", // name of order_items table field
                as: "order_item"         // alias for order_items table
            }
        },
        {   $unwind:"$order_item" },// $unwind used for getting data in object or for one record only


        {
            $lookup:{
                from: "order_details",       // other table name
                localField: "order_id",   // name of product table field
                foreignField: "order_id", // name of order_items table field
                as: "order_details"         // alias for order_items table
            }
        },
        {   $unwind:"$order_details" },


        {
            $lookup:{
                from: "payment_details",       // other table name
                localField: "payment_id",   // name of product table field
                foreignField: "payment_id", // name of order_items table field
                as: "payment_details"         // alias for order_items table
            }
        },
        {   $unwind:"$payment_details" },


      
       
        // Join with user_role table
        // define some conditions here 
        {
            $match:{
                $and:[{"product_name" : "GTX_0"}]
            }
        },
    
        // define which fields are you want to fetch
        {   
            $project:{
                product_name:1,
                product_type:1,
                order_id:"$order_item.order_id",
                payment_id:"$order_details.payment_id"
            } 
        }
    ]);


    dbo.collection("mongo").updateMany({"gpu_type": "Graphics_Card"}, {"$set":{"gpu_type": "GraphicsX4_Card"}})
    dbo.collection("product").deleteMany({}).toArray;
    dbo.collection("order_item").deleteMany({}).toArray;
    dbo.collection("order_details").deleteMany({}).toArray;
    dbo.collection("payment_details").deleteMany({}).toArray;
    console.log(new Date() - before); 
});

