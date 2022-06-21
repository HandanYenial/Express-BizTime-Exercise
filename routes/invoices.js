const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

//Add routes/invoices.js. All routes in this file should be prefixed by /invoices.
//GET /invoices
//Return info on invoices: like {invoices: [{id, comp_code}, ...]}

router.get("/" ,async function(req,res,next){
    try{
        const results = await db.query(`SELECT * FROM invoices`);
        return res.json({ invoices : results.rows});
    } catch(e){
        return next(e);
    }
});

//GET /invoices/[id]
//Returns obj on given invoice.If invoice cannot be found, returns 404.
//Returns {invoice: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}

router.get("/:id" , async function(req,res,next){
    try{
        const { id } = req.params;
        const result = await db.query("SELECT * FROM invoices WHERE id=$1" , [id]);
        if (result.rows.length === 0){
            throw new ExpressError("Can't find the invoice");
        }
        return res.json({ invoice : result.rows});
    }catch(e){
        return next(e);
    }
});






module.exports = router;