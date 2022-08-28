const express = require('express');
const cors = require("cors");
const sql = require('./routes/sql');
// const config = require('config');
// const mongoose = require('mongoose'); 

const brands = require('./routes/brands');
// const users = require('./routes/users');
// const auth = require('./routes/auth');
const home = require('./routes/home');
const app = express();
// mongoose.connect("mongodb+srv://rboul:rraammii@cluster0.cqozq.mongodb.net/?retryWrites=true&w=majority").
// then(()=>console.log('Connected to MongoDB...')).
// catch(err=>console.error('Could not connect to MongoDB.',err));
app.use(express.json());
app.use(cors());

app.use('/api/sql',sql);
// app.use('/api/brands',brands);
// app.use('/api/users',users);
// app.use('/api/auth',auth);
app.use('/',home);
const port = process.env.port || 80;
app.listen(port,()=>{
    console.log(`Listening on port ${port}` );
})