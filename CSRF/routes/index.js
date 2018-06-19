var express = require('express');
var router = express.Router();
var passport = require('passport');
var fs = require('fs');
var Tokens = require('csrf');
var user;

/*
* load the welcome page
* */
router.get('/', function (req, res) {
    res.render('index.ejs');
});

/*
* after signing in
* */
router.get('/profile', function (req, res) {
    req.isAuthenticated() ? res.render('profile.ejs', {title: user.username.toUpperCase()}) : res.redirect('login');
});

/*
* transfer money without a token
* */
router.get('/fastTransfer', function (req, res) {
    req.isAuthenticated() ? res.render('fastTransfer.ejs') : res.redirect('login');
});

router.post('/fastTransfer', function (req, res) {
    if (req.isAuthenticated()) {
        console.log("Transfer " + req.body.amount + "$ to " + req.body.account);
        res.redirect("/profile");
    }
});

/*
* transfer money with token hidden for safety
* */
router.get('/safeTransfer', function (req, res, next) {
    req.isAuthenticated() ? res.render('safeTransfer.ejs', {csrf: req.user.csrft}) : res.redirect('login');
});

router.post('/safeTransfer', function (req, res) {
    if (req.isAuthenticated() && req.user.csrft === req.body.csrfToken) {
        console.log("safe Transfer " + req.body.amount + "$ to " + req.body.account);
        res.redirect("/profile")
    }
});

/*
* log in to the bank with user name and password
* */
router.get('/login', function (req, res) {
    res.render('login.ejs');
});

router.post('/login', function (req, res) {
    var username = req.body.userName;
    var password = req.body.password;
    var path = require('path');
    var filePath = path.join(__dirname, 'users.txt');
    var array = fs.readFileSync(filePath).toString().split("\n");
    for(i in array) {
        var usr = array[i].toString().split(" ")[0];
        var pass = array[i].toString().split(" ")[1];
        if (username === usr  && password === pass) {
            user = {id: 1, username: username, csrft: Tokens().create(Tokens().secretSync())};
            req.login(user, function () {
                res.render('profile.ejs', {title: username.toUpperCase()});
            });
        }
    }
    res.send("Wrong User Or Password");
});

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    var usr;
    user.id === id ? usr = user : null;
    done(null, usr);
});

module.exports = router;
