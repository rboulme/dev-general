const _ = require('lodash');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');

const connection = require("../connection/mysqlconnection");
const router = express.Router();

router.post('/',async (req,res)=>{


    const sql = req.body.sql;
    connection.query(sql, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });


    // const err = validate(req.body);
    // if(err) return res.status(400).send(err);

    // try {
    //     const brand = new Brand(_.pick(req.body,['nameen','namear','logo','descriptionen','descriptionar']));
    //     await brand.save()
    //     res.send(`brand with id ${brand._id} added successfully`);
    // } catch (ex) {
    //     res.status(400).send(`${ex}`)
    // }
})

module.exports = router;