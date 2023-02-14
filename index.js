const express = require('express');
const app = express();


// middleware
app.use(express.static('./public'));


// index
app.get('/', (req, res) => {
    res.render('index.ejs');
    });

// new

// delete

// update

// create

// edit

// show







app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

