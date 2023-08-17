const {urlencoded,json}= require('express');
const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();

const port =6969;
// const expressLayouts=require('express-ejs-layouts');



const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportlocal=require('./config/passport-local-stategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongodb-session')(session);
// app.use(expressLayouts);
app.use(json());
// app.use(express.urlencoded());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(expressLayouts);

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'test648',
    secret:'test648test648',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        uri:'mongodb://0.0.0.0/test648_development',
        autoRemove:'disabled'
    },
    function(err){
        console.log(err||'setup ok')
    }
    )


}))

app.use(passport.initialize());
app.use(passport.session());



app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`error in connecting to server',${err}`)
    }
    console.log(`server is running on port: ${port}`)
})