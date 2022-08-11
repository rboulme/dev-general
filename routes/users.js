const _ = require('lodash');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const {User,validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me',auth,async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password'); 
    res.send(user);
});

router.post('/',async (req,res)=>{
    const err = validate(req.body);
    if(err) return res.status(400).send(err);
    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send("User already registered.");
    res.send(user);


    try {
        const user = new User(_.pick(req.body,['name','email','password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token',token).send(`Welcome ${user.name}`);
    } catch (ex) {
        res.status(400).send(`${ex}`)
        
    }
})

module.exports = router;