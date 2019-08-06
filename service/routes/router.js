const express = require("express");
const router = express.Router();

router.use((req,res,next) =>{
    let reqBody;
    if(req.method == "POST"){
        reqBody = req.body;
    }
    else if(req.method == "GET"){
        reqBody = req.query;
    }
    req.method != "OPTIONS" && (console.log("----------Request__Method----------:",req.method,"----------Request__Config----------:",reqBody))
    next();
})

module.exports = router