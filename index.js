const dotenv = require("dotenv");

dotenv.config();


var tmp = [];
for (var i = 0; i < 1; i++) {
  tmp.push(Configuration_create(i));
}
function Configuration_create(index) {
  return {
    "gpu_name": "GTX_" + index,
    "gpu_type": "Graphics_Card",
    "gpu_quantity": Math.floor(interval(1, 500)),
    "gpu_frequency": Math.floor(interval(900, 1500)),
    "gpu_memory": flist([1, 2, 3, 4, 6, 8, 12, 16, 24, 64]),
    "gpu_speed": Math.floor(interval(250, 1800)),
    "ram_name": "Memory_" + index,
    "ram_type": "Ram",
    "ram_quantity": Math.floor(interval(1, 1000)),
    "ram_frequency": Math.floor(interval(900, 1500)),
    "ram_memory": flist([1, 2, 3, 4, 6, 8, 12, 16, 24, 64]),
    "ram_speed": Math.floor(interval(250, 1800)),
    "cpu_name": "I_" + index,
    "cpu_type": "CPU",
    "cpu_quantity": Math.floor(interval(1, 500)),
    "cpu_frequency": Math.floor(interval(900, 1500)),
    "cpu_memory": flist([1, 2, 3, 4, 6, 8, 12, 16, 24, 64]),
    "cpu_speed": Math.floor(interval(250, 1800)),
    "Psu_name": "PSU_" + index,
    "Psu_type": "PSU",
    "Psu_quantity": Math.floor(interval(1, 500)),
    "Psu_frequency": Math.floor(interval(900, 1500)),
    "Psu_memory": flist([1, 2, 3, 4, 6, 8, 12, 16, 24, 64]),
    "Psu_speed": Math.floor(interval(250, 1800))
  };
}
function interval(min,max ) {
    return (Math.random()*(max - min)) + min ;

}
function flist(list) {
    return list[Math.floor(Math.random()* list.length)];
}
console.log(tmp)

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGO_URL

MongoClient.connect(url, function(err, db) {
  var dbo = db.db("mongoexperiment");
  var before = new Date();
  dbo.collection("mongo").insertMany(tmp);
  dbo.collection("mongo").find({}).toArray;
  dbo.collection("mongo").updateMany({"gpu_type": "Graphics_Card"}, {"$set":{"gpu_type": "GraphicsX4_Card"}})
  dbo.collection("mongo").deleteMany({}).toArray;
  console.log(new Date() - before); 
});





























































































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
var tmp = [];
for (var i = 0; i < 500; i++) {
  tmp.push(Configuration_create(i));
}

function Configuration_create(index) {
  return {
    "gpu_name": "GTX_" + index,
    "gpu_type": "Graphics_Card",
    "gpu_quantity": Math.floor(interval(1, 500)),
    "gpu_frequency": Math.floor(interval(900, 1500)),
    "gpu_memory": flist([1, 2, 3, 4, 6, 8, 12, 16, 24, 64]),
    "gpu_speed": Math.floor(interval(250, 1800)),
    "ram_name": "Memory_" + index,
    "ram_type": "Ram",
    "ram_quantity": Math.floor(interval(1, 1000)),
    "ram_frequency": Math.floor(interval(900, 1500)),
    "ram_memory": flist([1, 2, 3, 4, 6, 8, 12, 16, 24, 64]),
    "ram_speed": Math.floor(interval(250, 1800)),
    "cpu_name": "I_" + index,
    "cpu_type": "CPU",
    "cpu_quantity": Math.floor(interval(1, 500)),
    "cpu_frequency": Math.floor(interval(900, 1500)),
    "cpu_memory": flist([1, 2, 3, 4, 6, 8, 12, 16, 24, 64]),
    "cpu_speed": Math.floor(interval(250, 1800)),
    "psu_name": "PSU_" + index,
    "psu_type": "PSU",
    "psu_quantity": Math.floor(interval(1, 500)),
    "psu_frequency": Math.floor(interval(900, 1500)),
    "psu_memory": flist([1, 2, 3, 4, 6, 8, 12, 16, 24, 64]),
    "psu_speed": Math.floor(interval(250, 1800))
  };
}
function interval(min,max ) {
    return (Math.random()*(max - min)) + min ;

}
function flist(list) {
    return list[Math.floor(Math.random()* list.length)];
}
const before = new Date();
client.query(
  `INSERT INTO post_performance (gpu_name,
    gpu_type,
    gpu_quantity,
    gpu_frequency,
    gpu_memory,
    gpu_speed,
    ram_name,
    ram_type,
    ram_quantity,
    ram_frequency,
    ram_memory,
    ram_speed,
    cpu_name,
    cpu_type,
    cpu_quantity,
    cpu_frequency,
    cpu_memory,
    cpu_speed,
    psu_name,
    psu_type,
    psu_quantity,
    psu_frequency,
    psu_memory,Psu_speed)

   SELECT gpu_name,gpu_type,gpu_quantity,gpu_frequency,gpu_memory,gpu_speed,ram_name,ram_type,ram_quantity,ram_frequency,ram_memory,ram_speed,cpu_name,cpu_type,cpu_quantity,cpu_frequency,cpu_memory,cpu_speed,psu_name,psu_type,psu_quantity,psu_frequency,psu_memory,psu_speed FROM jsonb_to_recordset($1::jsonb) AS t (gpu_name text,
    gpu_type text,
    gpu_quantity int,
    gpu_frequency int,
    gpu_memory int,
    gpu_speed int,
    ram_name text,
    ram_type text,
    ram_quantity int,
    ram_frequency int,
    ram_memory int,
    ram_speed int,
    cpu_name text,
    cpu_type text,
    cpu_quantity int,
    cpu_frequency int,
    cpu_memory int,
    cpu_speed int,
    psu_name text,
    psu_type text,
    psu_quantity int,
    psu_frequency int,
    psu_memory int,
    psu_speed int)`,
  [
      JSON.stringify(tmp),
  ]
)

console.log(new Date() - before);

client.end;

client.query("DELETE FROM post_performance")
client.query("UPDATE post_performance SET gpu_type = 'GraphicsX4_Card'");
client.query("Select * from post_performance");
