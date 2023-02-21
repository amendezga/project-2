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
app.post('/menu/:id/update', (req, res) => {
  const burgerId = req.params.id;
  const burgerIndex = Number(burgerId) - 1;
  if (burgerIndex >= 0 && burgerIndex < burgers.length) {
    const { name, protein, greens, topping1, topping2, sauce } = req.body;
    const ingredients = [protein, greens, topping1, topping2, sauce];
    const updatedBurger = { ...burgers[burgerIndex], name, ingredients };
    burgers[burgerIndex] = updatedBurger;
    res.redirect('/menu');
  }
});

// create
app.post('/create', (req, res) => {
    const { name, protein, greens, topping1, topping2, sauce } = req.body;
  
    const ingredients = [protein, greens, topping1, topping2, sauce];
  
    const price = 10.99;
    const description = 'Your custom burger.';
    const id = burgers.length + 1;
  
    const newBurger = { id, name, ingredients, description, price };
  
    burgers.push(newBurger);
  
    res.redirect('/menu');
  });

// edit

app.get('/menu/:id/edit', (req, res) => {
  const burgerId = req.params.id;
  const burger = burgers.find(burger => burger.id === Number(burgerId));
  if (burger) {
    res.render('edit.ejs', { burger: burger });
  } 
});

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