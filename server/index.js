'use strict';
//commonJS import type => require('xyz') ,supported by Node
//es2015 style import => import xyz from xyz ,supported in React

const express = require('express'); //imports express module
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/key');
const bodyParser = require('body-parser');
require('./models/user');
require('./models/survey');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const bilingRoutes = require('./routes/bilingRoutes');
const survetRoutes = require('./routes/surveyRoutes');


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

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}

//handling dynamic port binding for deployment on heroku and development environment
const PORT = process.env.PORT || 5000;
//server listens on port 5000;
app.listen(PORT);
