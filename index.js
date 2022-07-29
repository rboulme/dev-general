
const express = require('express');
const mongoose = require('mongoose'); 

const brands = require('./routes/brands');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/dev-db').
then(()=>console.log('Connected to MongoDB...')).
catch(err=>console.error('Could not connect to MongoDB.',err));
app.use('/api/brands',brands);

require('./startup/prod')(app);
const port = process.env.port || 5000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}` );
})

