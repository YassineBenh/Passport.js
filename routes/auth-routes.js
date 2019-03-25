// create an instance of express router
const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login.ejs', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // destroy the cookie
    req.logout();
    // redirect to the home
    res.redirect('/');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    // what do we want from google
    scope: ['profile']
}));

// callback route for google to redirect to
// this timen authenticate('google') method got the code so it grabs the profile infos and fires the callback function of passport
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // redirect to profile page after login
    res.redirect('/profile');
});

// exports the router
module.exports = router;
