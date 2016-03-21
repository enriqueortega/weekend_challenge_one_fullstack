var express = require('express');
var index = require('./routes/index.js');
var app = express();
var bodyparser = require('body-parser');
var port = process.env.PORT || 3000;
var pg = require('pg');
var connectionString;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

if(process.env.DATABASE_URL) {//connecting to outside heroku database
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {//connecting to local database before being connected to heroku for testing purposes
  connectionString = 'postgress://localhost:5432/back_to_the_future';
}

pg.connect(connectionString, function(err, client, done){
  if (err){
    console.log("Error connecting to DB!", err);
  } else {
    var query = client.query('CREATE TABLE IF NOT EXISTS employees (' +
                              'id SERIAL PRIMARY KEY,' +
                              'first_name varchar(20) NOT NULL,' +
                              'last_name varchar(20) NOT NULL,' +
                              'employee_id integer NOT NULL,' +
                              'job_title varchar(50) NOT NULL,' +
                              'current_salary integer NOT NULL);');
    query.on('end', function(){
      console.log('Successfully checked employees');
      done();
    });

    query.on('error', function(){
      console.log('Error creating new employees');
      done();
    });
  }
});


app.use("/", index);

var server = app.listen(port, function(){
  var port = server.address().port;
  console.log('Up and running on: ', port);
});
//
// app.listen(3000, function(){
//   console.log("Tuning into port: 3000");
// });
