//Routes for companies 

const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");


//GET/companies
//Returns list of companies, like {companies: [{code, name}, ...]}

router.get("/" , async(req,res,next) => {
    try{
        const results = await db.query(`SELECT * FROM companies`);
        return res.json({ companies: results.rows});
    }catch(e){
        next(e);
    }
});

