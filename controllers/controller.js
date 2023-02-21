const express = require('express');
const router = express.Router();

const burgers = require('../models/burgers');

// index
router.get('/', (req, res) => {
  res.render('index.ejs');
});

router.get('/menu', (req, res) => {
  res.render('menu.ejs', {burgers})
});

// new
router.get('/new', (req, res) => {
  res.render('new.ejs')
});

// delete
router.delete('/menu/:id/delete', (req, res) => {
  const burgerId = req.params.id;
  const burgerIndex = Number(burgerId) - 1;
  if (burgerIndex >= 0 && burgerIndex < burgers.length) {
    burgers.splice(burgerIndex, 1);
    res.redirect('/menu');
  } else {
    res.status(404).send('Burger not found');
  }
});

// update
router.put('/menu/:id', (req, res) => {
  const burgerId = req.params.id;
  const burgerIndex = burgers.findIndex(burger => burger.id === Number(burgerId));
  if (burgerIndex >= 0) {
    const { name, protein, greens, topping1, topping2, sauce, price, description } = req.body;

    burgers[burgerIndex].name = name;
    burgers[burgerIndex].ingredients = [protein, greens, topping1, topping2, sauce];
    burgers[burgerIndex].price = parseFloat(price);
    burgers[burgerIndex].description = description;
  
    res.redirect('/menu');
  } 
});

// create
router.post('/create', (req, res) => {
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

router.get('/menu/:id/edit', (req, res) => {
  const burgerId = req.params.id;
  const burger = burgers.find(burger => burger.id === Number(burgerId));
  if (burger) {
    res.render('edit.ejs', { burger: burger });
  } 
});

// show
router.get('/menu/:id', (req, res) => {
  const burgerId = req.params.id;
  const burger = burgers.find(burger => burger.id === Number(burgerId));
  if (burger) {
    res.render('show.ejs', { burger: burger });
  } 
});

module.exports = router;