
const express = require('express');
const mongoose = require('mongoose'); 

const brands = require('./routes/brands');
const home = require('./routes/home');

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://rboul:rraammii@cluster0.cqozq.mongodb.net/?retryWrites=true&w=majority").
// mongoose.connect("mongodb+srv://rboul:rraammii@tochange-dev.cqozq.mongodb.net/test");
then(()=>console.log('Connected to MongoDB...')).
catch(err=>console.error('Could not connect to MongoDB.',err));
app.use('/api/brands',brands);
app.use('/api/brands',home);

const port = process.env.port || 80;
app.listen(port,()=>{
    console.log(`Listening on port ${port}` );
})

