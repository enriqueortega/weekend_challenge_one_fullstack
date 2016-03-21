var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString;

if(process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgress://localhost:5432/back_to_the_future';
}

//Enters employees to the DB
router.post('/*', function(req,res){
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var employee_id = req.body.employee_id;
  var job_title = req.body.job_title;
  var current_salary = req.body.current_salary;
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log('error connecting to DB:', err);
      res.status(500).send(err);
      done();
      return;
    }

    //Enters data from front end into new row to the DB
    var query = client.query('INSERT INTO employees ' +
                              '(first_name, last_name, employee_id, job_title, current_salary) ' +
                              'VALUES ($1, $2, $3, $4, $5);',
                              [first_name, last_name, employee_id, job_title, current_salary]);

    query.on('end', function(){
      res.status(200).send('successfully inserted employee');
      done();
    });

    query.on('error', function(error){
      console.log('NEERRRRD');
      res.status(500).send(error);
      done();
    });
  })
});

//Pulls employees from the DB
router.get('/*', function(req, res){
  console.log('We got people');
  pg.connect(connectionString, function(err, client, done){
    if (err){
      res.status(500).send(err);
      done();
      return;
    }

    var results = [];
    var employees = client.query('SELECT * FROM employees;');

    employees.on('row', function(row){
      console.log('we got a row', row);
      results.push(row);
    });

    employees.on('end', function(){
      res.send(results);
      done();
    });

    employees.on('error', function(error){
      res.status(500).send(error);
      done();
    });
  })
});

module.exports = router;
