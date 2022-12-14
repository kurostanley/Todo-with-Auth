const express = require('express');
const router = express.Router();
const mongoose = express('mongoose');
const { ensureAuthenticated, ensureAuthenticatedInWelcome  }= require('../config/auth');

// Welcome Page
router.get('/', ensureAuthenticatedInWelcome, (req, res) => 
    res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    if(req.user.todo.length == 0){
        let intro = ['add', 'something', 'todo!','checkbox','is to delete item'];
        intro.forEach(element => {
            req.user.todo.push(element);
        });
        req.user.save();
    }
    res.render('dashboard', {
        name: req.user.name,
        newListItem:  req.user.todo
    }
)});


// add new to-do
router.post('/add', function(req, res){
    let i =  req.body.inputfield;
    req.user.todo.push(i);
    req.user.save();
    res.redirect('/dashboard')
})

// test1

// delete a to-do
router.post('/delete', function(req, res){
    console.log(req.body.checkbox);
    req.user.todo.splice(req.body.checkbox, 1);
    req.user.save();
    res.redirect('/dashboard')
})

// add reset button
router.post('/reset', function(req, res){
    req.user.todo = [];
    req.user.save();
    res.redirect('/dashboard');
})


module.exports = router;