const express = require('express');
const httpRequest = require('../utils/request');
const router = express.Router();
const fs = require('fs');
router.get("/musicList",(req,res,next) =>{
    console.log(req,res)
    httpRequest('https://api.apiopen.top/musicBroadcasting','get')
    .then(result =>{
        console.log(res)
        res.send(result)
    })
    .catch(err =>{
        console.log(err)
        res.send(err)
    })
})

module.exports = router;
