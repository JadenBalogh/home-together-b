// This is based on https://www.w3schools.com/nodejs/nodejs_mysql_create_table.asp

// Required because our package.json is defined as a module 
// see: https://nodejs.org/api/modules.html#modules_module_createrequire_filename
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

var mysql = require('mysql2');

// Creates the Connection based on the input parameters using the DB we created earlier
var con = mysql.createConnection({
    host: "localhost",
    user: "notAdmin",
    password: "notAdmin99!!",
    database: "HTDB"
});
// NOTE - DELETE THIS IF YOU WANT TO RUN THE DEMO MULTIPLE TIMES, It will error if you don't as the table already exists.
// Creates a table
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // Creates a table called customers with an auto-incrementing primary key and 2 VARCHAR Fields.
    var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});

// Adds an one entry into our table
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

// To insert more than one record at a time we make an array,
// Then we insert a ? wildcard into the SQL, which will be replaced

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // We don't need to insert IDs because the DB knows to auto-increment as per our table creation
    var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [
      ['John', 'Highway 71'],
      ['Peter', 'Lowstreet 4'],
      ['Amy', 'Apple st 652'],
      ['Hannah', 'Mountain 21'],
      ['Michael', 'Valley 345'],
      ['Sandy', 'Ocean blvd 2'],
      ['Betty', 'Green Grass 1'],
      ['Richard', 'Sky st 331'],
      ['Susan', 'One way 98'],
      ['Vicky', 'Yellow Garden 2'],
      ['Ben', 'Park Lane 38'],
      ['William', 'Central st 954'],
      ['Chuck', 'Main Road 989'],
      ['Viola', 'Sideway 1633']
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
      console.log("We Will now select these values from our table:");
    });
  });

  // Selects all the columns from the customers table then prints to the console.
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM customers", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });