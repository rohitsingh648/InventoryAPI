const passport=require('passport');
const User = require('../models/user');
const LocalStrategy=require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField:'email'
},async function(email,password,done){
    try{
        const user=await User.findOne({
            email:email});
            if (!user||user.password !== password){
                console.log('invalid username/password');
                return done(null,false);
            }
            return done(null,user);

    }catch(err){
        console.log('error in finf=ding the user',err);
        return done(err);
    }
}))

passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  


passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
  
      if (!user) {
        console.log("User not found");
        return done(null, false);
      }
  
      return done(null, user);
    } catch (err) {
      console.log("Error in finding user --> Passport", err);
      return done(err);
    }
  });

  //check if the user is authenticated
passport.checkAuthentication= function(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    return res.redirect('./user/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if (req.isAuthenticated()){
        //req.user contains the current signe in user from the cookie and we are just sending this to the locals foe the views 
        res.locals.user=req.user;
    }
    next();
}
  module.exports=passport;