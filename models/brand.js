const mongoose = require('mongoose'); 
const Joi = require('joi');
const brandSchema = new mongoose.Schema({
    nameen:{
        type:String,
        required:true,
        maxlength:50,
        trim:true
        },
    namear:{
        type:String,
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
async function validateBrand(brand){
    const schema = Joi.object({
        nameen: Joi.string().max(50).required(),
        namear: Joi.string().max(50).required(),
    });
    const {error} = schema.validate(brand);
    if(error) return error.details[0].message;
    //Another Validations
    return null;
}
const Brand = mongoose.model('Brand',brandSchema);
exports.Brand = Brand;
exports.validate = validateBrand;
exports.brandSchema = brandSchema;