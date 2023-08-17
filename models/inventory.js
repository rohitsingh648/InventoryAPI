const mongoose=require('mongoose');
// const { TRUE } = require('node-sass');

const inventorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    }


},{
    timestamps:true
});

const Inventory=mongoose.model('INVENTORY',inventorySchema);
module.exports=Inventory;