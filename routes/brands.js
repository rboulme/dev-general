const {Brand,validate} = require('../models/brand');
const _ = require('lodash');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
router.get('/',auth,async (req,res)=>{
    const brands = await Brand.find();
    res.send(brands);
})
router.post('/',[auth,admin],async (req,res)=>{
    const err = validate(req.body);
    if(err) return res.status(400).send(err);

    // const user = await User.findById(req.user._id).select('-password'); 

    try {
        const brand = new Brand(_.pick(req.body,['nameen','namear','logo','descriptionen','descriptionar']));
        await brand.save()
        res.send(`brand with id ${brand._id} added successfully`);
    } catch (ex) {
        res.status(400).send(`${ex}`)
    }
})
router.put('/:id',[auth,admin],async (req,res)=>{
    const err = validate(req.body);
    if(err) return res.status(400).send(err);
    
    try {
        const brand = await Brand.findByIdAndUpdate(req.params.id,_.pick(req.body,['nameen','namear','logo','descriptionen','descriptionar']),{new:true});
        res.send(`brand with id ${brand._id} updated successfully`);
    } catch (ex) {
        return res.status(404).send(`${ex}`);
    } 
})
router.delete('/:id',[auth,admin],async (req,res)=>{
    try {
        const deleted = await Brand.deleteOne({_id:req.params.id});
        if(!deleted) res.status(404).send('No brand with this id');
        res.send(`${deleted.deletedCount} item deleted`);
    } catch (ex) {
        res.status(400).send(`${ex}`)
    }
    
})
module.exports = router;