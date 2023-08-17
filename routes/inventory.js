const express=require('express');
const router=express.Router();
const passport=require('passport');

const inventoryController=require('../controller/inventory_controller')
router.post('/create',passport.checkAuthentication,inventoryController.create);
router.get('/', passport.checkAuthentication, inventoryController.home);

module.exports=router;