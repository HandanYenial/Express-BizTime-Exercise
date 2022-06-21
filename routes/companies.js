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

router.get("/:code" , async(req,res,next) => {
    try{
        const { code } = req.params;
        const results = await db.query(`SELECT * FROM companies WHERE code = $1`, [code]);
        if(results.rows.length === 0){
            throw new ExpressError("Company not found", 404);
        }
        return res.send({ company: results.rows[0]});
    }catch(e){
        return next(e);
    }
});

router.post("/" , async(req,res,next) => {
    try{
        //const{ code, name, description } = req.params; can be used also
        const result = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`, [req.body.code, req.body.name , req.body.description]);
        return res.send({ company: result.rows[0]});
    }catch(e){
        next(e);
    }
});

router.put("/" , async(req,res,next) => {
    try{
        const result = await db.query(`UPDATE companies SET name = $1 WHERE code = $2 RETURNING code, name`, [req.body.name, req.body.code]);
        return res.json({ company: result.rows[0]});
    }catch(e){
        next(e);
    }
});

module.exports = router;