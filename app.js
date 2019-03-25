const express = require('express');
const passportSetup = require('./config/passport-setup.js');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// mongodb connection to mongoatlas online
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true}, () => {
    console.log('connected to mongodb');
});

// setup view engine
app.set('view engine', 'ejs');

// use cookie-session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initilaze passport
app.use(passport.initialize());
app.use(passport.session());

// auth routes
app.use('/auth', require('./routes/auth-routes.js'));

// profile routes
app.use('/profile', require('./routes/profile-routes.js'));

//create home route
app.get('/', (req, res) => {
    res.render('home.ejs', { user: req.user });
});


app.listen(5000, function(){
    console.log('Actually listening on port 5000 ');
});
