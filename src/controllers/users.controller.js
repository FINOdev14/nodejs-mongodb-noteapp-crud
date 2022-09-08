const usersCtrl = {};
const passport = require('passport');

const User = require('../models/User');

usersCtrl.renderSignupForm = (req,res) => {
    res.render('users/signup')
};

usersCtrl.signup = async (req,res) => {
    //console.log(req.body);
    const errors = [];
    const {name, email, password, confirm_password} = req.body;

    if (password != confirm_password) {
        errors.push({text: 'La Contraseña no coincide'});
    }
    if (password.length < 4) {
        errors.push({text:'La contraseña No Puede Ser Menor a 4 Caracteres'});
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    }else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('errors_msg','El Correo Ya Esta Registrado');
            res.redirect('/users/signup');
        }else{
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg','Ya estas Registrado')
            res.redirect('/users/signin');
        }
    }
    
};

usersCtrl.renderSigninForm = (req,res) => {
    res.render('users/signin')
};

usersCtrl.signin = passport.authenticate('local',{
    failureRedirect: '/users/signin',
    successRedirect: '/notas',
    failureFlash: true
});

usersCtrl.logout = async (req,res, next) => {
    //req.session.user = null;
    //req.logout();
    //req.flash('success_msg', 'Tu sesion a Finalizado');
    //res.redirect('/users/signin');
    await req.logout((err) => {
    if (err) {
        return next(err); 
    }else{
        
        req.flash('success_msg', 'Tu sesion a Finalizado');     
        res.redirect('/users/signin');
    }
    });
    
};

module.exports = usersCtrl;