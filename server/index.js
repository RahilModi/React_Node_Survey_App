'use strict';
//commonJS import type => require('xyz') ,supported by Node
//es2015 style import => mport xyz from xyz ,supported in React

const express = require('express'); //imports express module
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/key');
const bodyParser = require('body-parser');
require('./models/user');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const bilingRoutes = require('./routes/bilingRoutes');

mongoose.connect(keys.DATABASE_URL);
const app = express(); //start express app

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app); //require('./routes/authRoutes')(app) is same as import and execution
bilingRoutes(app);

//handling dynamic port binding for deployment on heroku and development environment
const PORT = process.env.PORT || 5000;
//server listens on port 5000;
app.listen(PORT);
