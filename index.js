const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const burgers = require('./models/burgers');
const methodOverride = require('method-override');
const burgersController = require('./controllers/controller')
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/', burgersController);

app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT);
});