const mongoose = require('mongoose'); 
const Joi = require('joi');
const brandSchema = new mongoose.Schema({
    nameen:{
        type:String,
        unique:true,
        required:true,
        maxlength:50,
        trim:true

        },
    namear:{
        type:String,
        unique:true,
        required:true,
        maxlength:50,
        trim:true
        },
    logo:{
        type:String,
        maxlength:300,
        default:''
        },
    descriptionen:{
        type:String,
        default:''
        },
    descriptionar:{
        type:String,
        default:''
        }
});
function validateBrand(brand){
    const schema = Joi.object({
        nameen: Joi.string().max(50).required(),
        namear: Joi.string().max(50).required(),
        logo: Joi.string().max(50).allow(''),
        descriptionen: Joi.string().max(500).allow(''),
        descriptionar: Joi.string().max(500).allow(''),
    });
    const {error} = schema.validate(brand);
    if(error) return error.details[0].message;
    return null;
}
const Brand = mongoose.model('Brand',brandSchema);
exports.Brand = Brand;
exports.validate = validateBrand;
exports.brandSchema = brandSchema;