//Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        req.flash('danger', 'Please Login');
        res.redirect('/');
    }
}

module.exports = ensureAuthenticated;