const {Brand,validate} = require('../models/brand');
const express = require('express');
const router = express.Router();
router.get('/',async (req,res)=>{
    const brands = await Brand.find();
    res.send(brands);
})
router.post('/',async (req,res)=>{
    const err = await validate(req.body);
    if(err) return res.status(400).send(err);
    try {
        const brand = new Brand(req.body);
        await brand.save()
        res.send(`brand with id ${brand._id} added successfully`);
    } catch (ex) {
        res.send(ex.errors)
    }
})
router.put('/:id',async (req,res)=>{
    const err = await validate(req.body);
    if(err) return res.status(400).send(err);
    try {
        const brand = await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.send(`brand with id ${brand._id} updated successfully`);
    } catch (ex) {
        return res.status(404).send(ex.message);
    } 
})
router.delete('/:id',async (req,res)=>{
    const deleted = await Brand.deleteOne({_id:req.params.id});
    if(!deleted) res.status(404).send('No brand with this id');
    res.send(`${deleted.deletedCount} item deleted`);
    // res.send(deleted);
})
module.exports = router;