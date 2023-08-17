const mongoose=require('mongoose');

mongoose.connect('mongodb://0.0.0.0/Apitesting');


const db=mongoose.connection;

db.on('error',console.error.bind(console,"Err in connection"));


db.once('open',function(){
    console.log('Connected to database::MongoDB');
})


module.exports=db;