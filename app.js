const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// test

// Passprot config
require('./config/passport')(passport);
require('dotenv').config();

//DB config
const db = process.env.MongoURI;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongodb Connected...'))
    .catch(err => console.log(err)) ;

// EJS Config
app.use(expressLayout)  // 使用 expressLayout 這個 middleware
app.set('view engine', 'ejs')  //使用 ejs 當作 node.js 的 view engine

// Bodyparser
app.use(bodyParser.urlencoded({extended: true}));


// Express Session
app.use(session({
    secret: 'secert',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Set Router
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// server configuration
const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server start on port ${PORT}`))






