'use strict';
//commonJS import type => require('xyz') ,supported by Node
//es2015 style import => mport xyz from xyz ,supported in React

const express = require('express'); //imports express module

const app = express(); //start express app

//
app.get('/',(req,res) => {
  res.send({hi: 'there'});
});

//handling dynamic port binding for deployment on heroku and development environment
const PORT = process.env.PORT || 5000;
//server listens on port 5000;
app.listen(PORT);
