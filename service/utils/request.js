const express = require('express');
const request = require('request');
const router = express.Router();
const fs = require('fs');


const httpRequest = (url,method,data) =>{
    let result = {};
    return new Promise((reslove,reject) =>{
        request({
            method:method,
            uri:url,
            data:data ? data : {}
        },(error,res,body) =>{
            if(res){
                result.result = JSON.parse(body).result;
                result.resultCode = "0000"
                result.resultMsg = "ok";
                reslove(result)
            }
            if(error){
                reject(error)
            }
        })
    })
}

module.exports = httpRequest;