const express=require('express');

const router=express.Router();

const homeController=require('../controller/homeController');
const { route } = require('./users');

console.log('router loaded for home');



router.get('/',homeController.home);
router.use('/users', require('./users'));
router.use('/inventory',require('./inventory'))
router.use('/api',require('./api'))

module.exports=router;