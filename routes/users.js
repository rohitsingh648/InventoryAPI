const express= require('express');
const router=express.Router();
const userController=require('../controller/usersController');
const passport=require('passport');
console.log('router loaded for user')

router.get('/',userController.users);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);
//use passport as a middle ware to authenticate
router.post('/create-session',passport.authenticate('local',
{failureRedirect:'/user/sign-in'}),userController.createSession);

//logout
router.get('/sign-out',userController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);


module.exports=router;