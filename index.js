const express = require('express');
const mongoose = require('mongoose');
const burgers = require('./models/burgers');
const app = express();


// middleware
app.use(express.static('./public'));


// index
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/menu', (req, res) => {
  res.render('menu.ejs', {burgers})
})

// new

// delete

// update

// create

// edit

// show







app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});