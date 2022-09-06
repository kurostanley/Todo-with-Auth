const express = require('express');
const router = express.Router();
const mongoose = express('mongoose');
const { ensureAuthenticated  }= require('../config/auth');

// Welcome Page
router.get('/', (req, res) => 
    res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name,
        newListItem:  req.user.todo
    }));


// add new to-do
router.post('/add', function(req, res){
    let i =  req.body.inputfield;
    req.user.todo.push(i);
    req.user.save();
    res.redirect('/dashboard')
})


// delete a to-do
router.post('/delete', function(req, res){
    console.log(req.body.checkbox);
    req.user.todo.splice(req.body.checkbox, 1);
    req.user.save();
    console.log("success delete");
    res.redirect('/dashboard')
})

// add reset button
router.post('/reset', function(req, res){
    req.user.todo = [];
    req.user.save();
    res.redirect('/dashboard');
})


module.exports = router;