var express = require("express");
var router = express.Router();

router.get("/", function(req,res){
    res.render("./pages/sale");
});

module.exports = router;