const helpers = {};

helpers.isAuthenticated = (req, res, netx) => {
    if(req.isAuthenticated()){
        return netx();
    }
    req.flash('error_msg', 'Not Authorized')
    res.redirect('/users/signin');
}
module.exports = helpers;