const usersCtrl = {};
const User = require('../models/User')


usersCtrl.renderSignUpForm = (req,res) =>{
    res.render('users/signup');
}

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: 'Passwords do not match'});
    }
    if(password.length < 4){
        errors.push({text:'Passwords must be at least 4 characters.'});
    }
    if(errors.length >0){
        res.render('users/signup',{
            errors,
            name,
            email,
            password,
            confirm_password
        })
    }else{
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
          if (req.flash("error_msg", "The Email is already in use.")){
            errors,
            name,
            email,
            password,
            confirm_password
          };
          res.redirect("/users/signup");
        }else {
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg', 'You are Registered')
            res.redirect('/users/signin');
        }
    }
}

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
}

usersCtrl.signin = (req, res) => {
    res.send('signin');
}

usersCtrl.logout = (req, res) => {
    res.send('logout');
}

module.exports = usersCtrl