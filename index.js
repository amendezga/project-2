const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const burgers = require('./models/burgers');
const app = express();


// middleware
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));



// index
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/menu', (req, res) => {
  res.render('menu.ejs', {burgers})
})

// new
app.get('/new', (req, res) => {
  res.render('new.ejs')
})

// delete

// update

// create
app.post('/create', (req, res) => {
    const { name, protein, greens, topping1, topping2, sauce } = req.body;
  
    const ingredients = [protein, greens, topping1, topping2, sauce];
  
    const price = 10.99;
    const description = 'A classic cheeseburger with all the fixings.';
    const id = burgers.length + 1;
  
    const newBurger = { id, name, ingredients, description, price };
  
    burgers.push(newBurger);
  
    res.redirect('/menu');
  });

// edit

// show
app.get('/menu/:id', (req, res) => {
  const burgerId = req.params.id;
  const burger = burgers.find(burger => burger.id === Number(burgerId));
  if (burger) {
    res.render('show.ejs', { burger: burger });
  } else {
    res.status(404).send('Burger not found');
  }
});







app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});