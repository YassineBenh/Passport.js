const express = require('express');
const passportSetup = require('./config/passport-setup.js');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const cookieSession = require('cookie-session'):

const app = express();

// mongodb connection to mongoatlas online
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true}, () => {
    console.log('connected to mongodb');
});

// setup view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: []
}));

// auth routes
app.use('/auth', require('./routes/auth-routes.js'));

//create home route
app.get('/', (req, res) => {
    res.render('home.ejs');
});


app.listen(5000, function(){
    console.log('Actually listening on port 5000 ');
});
