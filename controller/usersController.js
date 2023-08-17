const User=require('../models/user');


module.exports.users=function(req,res){

    console.log("Request form user recieved")
    return res.render('user_profile',{title:"user"});
}


module.exports.signUp=function(req,res){
if (req.isAuthenticated()){
 
    return res.redirect('/users')
}

    return res.render('sign_up',{title:"user sign up"});
}


module.exports.signIn=function(req,res){

    if (req.isAuthenticated()){
        return res.redirect('/users')
    }
     
    return res.render('sign_in',{title:"user sign in"});
}


module.exports.createSession=function(req,res){
    return res.redirect('/');
}




module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirmpassword) {
    return res.redirect('back');
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create(req.body);
      return res.redirect('/users/sign-in');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error in creating user while sign up', err);
    return res.redirect('back');
  }
};

module.exports.destroySession = function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
};