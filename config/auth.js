module.exports = {
    ensureAuthenticated: function(req, res, next){
        console.log(req.isAuthenticated());
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please log in to view this resource');
        res.redirect('/users/login');
    }
}