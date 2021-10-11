# Database_performance_comparison

1. Install both SQL (PostgreSQL) and NOSQL (MongoDB) in an operating system and connect these databases with server side language at the beginning of the experiment.
2. Generating data with large amount of rows, records, information and using various amount of records to experiment insert, select, update, delete operations in various scale of data using both databases
3. Measure the time of each query execution time and analyze the time to get insight of both databases and compare them using statistical analysis.


3.1. Installing Databases

In this experiment we had to download and install both MongoDB and PostgreSQL databases in our system. The experiment was designed in Intel core i5 processor having 4 gigabytes of ram and 64 bit operating system. In this experiment we have used JavaScript as a backend language. We have used server side javascript runtime such as node js in the experiment. We have installed necessary node package library mongodb, pg in our experiment. At first we had to create database and table in SQL database PostgreSQL and similarly create a database and collection inside the database in MongoDB which is NoSQL database. Then we had to connect the javascript runtime with MongoDB and PostgreSQL databases. The tests were done by executing using JavaScript files that were contained with different queries to the database. To make sure the tests were not affected by any kinds of ram usage like other background apps, tabs etc. the script were run in an environment where there were no other apps running in the background to use ram, in order to maximize the full usage to the script. The environment was made as fair as possible for both management system to get the best outcome.
To show the performance between the database was made by executing and looking into how fast each one of the javascript could finish the execution of different types of queries such as inserting data updating data removing data and selecting data. These are the basic and main operations used in the experiment


3.2. Generating Data and execute queries


In this experiment we have created an empty array of object and generate data by executing function. We can create various amount of data by executing a loop of different amount of data that needed in the experiment. The data will be stored in different amount of array of object in the temporary array. An example of data object that will be stored in the array.
{
gpu_name: 'GTX_0',
gpu_type: 'Graphics_Card',
gpu_quantity: 311,
gpu_frequency: 1480,
gpu_memory: 24,
gpu_speed: 1759,
ram_name: 'Memory_0',
ram_type: 'Ram',
ram_quantity: 490,
ram_frequency: 935,
ram_memory: 8,
ram_speed: 954,
cpu_name: 'I_0',
cpu_type: 'CPU',
cpu_quantity: 364,
cpu_frequency: 995,
cpu_memory: 8,
cpu_speed: 1625,
psu_name: 'PSU_0',
psu_type: 'PSU',
psu_quantity: 364,
psu_frequency: 1390,
psu_memory: 12,
psu_speed: 909
}



After generating the data, we had pushed the array into the database table in PostgreSQL and MongoDB database collection. After inserting the different amount of rows and objects of data in the both database, we have performed the other queries such as select, update and delete operations


3.3. Measure the time and analysis the result

During the period of executing queries in different amounts of data, we had measured the time that had taken in the both database. We had used JavaScript function new Date() which had helped us to measure the execution of queries in milliseconds. Then we had created a table of execution time of insert, update, delete, select operations in 50,100 and 500 data. Based on the results that we had found we created graph to visualize the performance statistically.



4. Implementation


Mongoexperiment is the name of the database where all the mongoDB works were done and mongo is a schema. “npn install mongoDB” is used to perform JavaScript with mongoDB. Then we had connect the Mongoexperiment database with node Js using Mongoclient.connect function. We had created an empty array named tmp and used “Configuration_create” function to store different amount of data in the tmp array. Then we have created another variable named before which act as the initial timestamp for our experiment. Then we pushed the array to perform insert operation in the mongoDB database and created a final timestamp and finally we subtracted the final timestamp from the initial timestamp to get the time in milliseconds.
Here is the process below of insert operation in mongoDB and measuring the time:
var before = new Date()
dbo.collection(“mongo”).inserMany(tmp)
console.log(new Date() – before)
After inserting documents in mongoDB, we had performed the update operations and measure the time in the given process below


var before = new Date()
dbo.collection(“mongo”).updateMany({"gpu_type": "Graphics_Card"}, {"$set":{"gpu_type": "GraphicsX4_Card"}}
)
console.log(new Date() – before)


After updating documents in mongoDB, we had performed the select operations and measure the time in the given process below.
var before = new Date()
dbo.collection(“mongo”).find({}).toArray
console.log(new Date() – before)


After selecting documents in mongoDB, we had performed the delete operations and measure the time in the given process below.
var before = new Date()
dbo.collection(“mongo”).deleteMany({}).toArray
console.log(new Date() – before)

.
For PostgreSQL,“post_experiment” is the database where all the PostgreSQL works were done and post_performance is the table. “npm install pg” is used to perform javascript with PostgreSQL . Host id, user id, port, password and database name was selected and client.connect function helped to connect JavaScript with PostgreSQL for the experiment.
The data is inserted into the database with “`Insert Into post_performance()” and selected all of the fields from the table and with the help of “jsonb_to_recordset($1::jsonb)” and “JSON.stringify(tmp)” function we were able to insert the data into the database




Here is the process below of insert operation in PostgreSQL and measuring the time:
var before = new Date()
client.query(
`INSERT INTO post_performance (column_name)
SELECT column_name FROM jsonb_to_recordset($1::jsonb) AS t (column name data type)`,
[
JSON.stringify(tmp),
]
)
console.log(new Date() – before)
After inserting documents in PostgreSQL, we had performed the update operations and measure the time in the given process below





var before = new Date()
client.query("UPDATE post_performance SET gpu_type = 'GraphicsX4_Card'")
console.log(new Date() – before)


After updating documents in PostgreSQL, we had performed the select operations and measure the time in the given process below.
var before = new Date()
client.query("Select * from post_performance")
console.log(new Date() – before)


After selecting documents in PostgreSQL, we had performed the delete operations and measure the time in the given process below.
var before = new Date()
client.query("DELETE FROM post_performance")
console.log(new Date() – before)

In this way, we have performed queries both of the databases.








