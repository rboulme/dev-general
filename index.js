const express = require('express');
const config = require('config');
const mongoose = require('mongoose'); 
const brands = require('./routes/brands');
const users = require('./routes/users');
const auth = require('./routes/auth');
const home = require('./routes/home');
const app = express();


// if(!config.get("jwtPrivateKey")){
//     console.error('FATAL ERROR: JWT is not defined.');
//     process.exit(1);
// }


mongoose.connect("mongodb+srv://rboul:rraammii@cluster0.cqozq.mongodb.net/?retryWrites=true&w=majority").
then(()=>console.log('Connected to MongoDB...')).
catch(err=>console.error('Could not connect to MongoDB.',err));

app.use(express.json());
// app.use(express.urlencoded({extended:false}))
// function passwordProtected(req,res,next){
//     res.set("WWW-Authenticate","Basic realm ='Our MERN App'");
//     if (req.header.authorization == 'Basic YWJlZXI6YWJlZXIxMjM=') {
//         next();
//     } else {
//         console.log(req.headers.authorization);
//         res.status(401).send("Try again");
//     }
// }
// app.use(passwordProtected);

app.use('/api/brands',brands);
app.use('/api/users',users);
app.use('/api/auth',auth);

app.use('/',home);
const port = process.env.port || 80;
app.listen(port,()=>{
    console.log(`Listening on port ${port}` );
})