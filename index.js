const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const ejs = require('ejs');

const app = express();

// Set EJS as the default view engine
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Define a route for displaying the salary calculator form
app.get('/', (req, res) => {
  const { country = '', age = '', city = '', salary = '', error = '' } = req.query;
  res.render('salary', { country, age, city, salary, error });
});

// Define a route for calculating the salary
app.post('/salary', (req, res) => {
  const { country = '', age = 0, city = '' } = req.body;

  // Spawn a new process to execute the Python script
  const python = spawn('python', ['salary.py', country, age, city]);

  // Capture the script's output as a string
  let salary = '';
  python.stdout.on('data', (data) => {
    salary += data.toString();
  });

  // Handle errors or when the script completes
  python.on('error', (error) => {
    console.error(error);
    res.redirect(`/?error=${encodeURIComponent('An error occurred')}`);
  });

  python.on('close', (code) => {
    if (code === 0) {
      res.redirect(`/?salary=${encodeURIComponent(salary.trim())}`);
    } else {
      console.error(`Python script exited with code ${code}`);
      res.redirect(`/?error=${encodeURIComponent('An error occurred')}`);
    }
  });
});

