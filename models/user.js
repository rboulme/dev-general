const mongoose = require('mongoose'); 
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        minlength:5,
        maxlength:50,
        trim:true

        },
    email:{
        type:String,
        unique:true,
        required:true,
        maxlength:50,
        trim:true
        },
    password:{
            type:String,
            required:true,
            maxlength:1024,
            },
    isAdmin:{
        type:Boolean,
        },
        
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},config.get('jwtPrivateKey'));
    return token;
}

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(50).required()
    });
    const {error} = schema.validate(user);
    if(error) return error.details[0].message;
    return null;
}
const User = mongoose.model('User',userSchema);
exports.User = User;
exports.validate = validateUser;
// exports.userSchema = userSchema;