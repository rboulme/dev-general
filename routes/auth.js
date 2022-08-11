const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/',async (req,res)=>{

    const err = validate(req.body);
    if(err) return res.status(400).send(err);

    let user = await User.findOne({name:req.body.name})
    if(!user) return res.status(400).send("Invalid email or password.");
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send("Invalid email or password.");
    const token = user.generateAuthToken();
    res.send(token);
})

function validate(req){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(50).required()
    });
    const {error} = schema.validate(req);
    if(error) return error.details[0].message;
    return null;
}

module.exports = router;