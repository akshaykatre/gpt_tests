const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(`
    <form action="/" method="POST">
      <label for="country">Country:</label>
      <input type="text" name="country" id="country"><br><br>

      <label for="age">Age:</label>
      <input type="number" name="age" id="age"><br><br>

      <label for="city">City:</label>
      <input type="text" name="city" id="city"><br><br>

      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/', (req, res) => {
  //const { country, age, city } = req.body;
  let { country, age, city } = req.body;

  // Set default values for empty or missing parameters
  country = country || '""';
  age = age || 0;
  city = city || '""';

  // Execute the Python script with the user inputs as arguments
  exec(`python3 salary.py ${country} ${age} ${city}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      res.send('An error occurred');
      return;
    }

    const salary = stdout.trim();
    res.send(`Your salary is ${salary}!`);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
