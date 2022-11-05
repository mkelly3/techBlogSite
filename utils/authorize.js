const authorize = (req,res,next) => {
    //checking to see if the session has a user id
    if(!req.session.user_id) {
        //if there is no id then the user is routed to the login page
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = authorize;