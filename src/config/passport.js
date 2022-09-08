const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done)=>{

    //matc email's user
    const user = await User.findOne({email})
    if (!user) {
        return done(null, false, {message: 'Losiento No existes'});
    }else{
        //Math password's User
        const match = await user.matchPassword(password);
        console.log(password);
        if (match) {
            return done(null, user);
        }else{
            return done(null, false, {message: 'Contraseña Incorrecta'});
        }
    }

}));

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=> {
        done(err, user);
    });
});