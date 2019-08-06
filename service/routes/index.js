const express = require("express");
const router = express.Router();
const SQL = require("../service/db");

router.get("/start",(req,res,next) =>{
    let queryObj = req.query;
    let queryParam = ['*'];
    // sql查询数据
    SQL.query(queryParam,'websites',queryObj)
    .then(result =>{
        console.log(result)
        res.send(result)
    })
    .catch(error =>{
        console.log(error)
        res.send(error)
    })
})

module.exports = router;