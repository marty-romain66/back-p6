const express = require("express");
const router = express.Router();
const allSauces = require( '../controllers/sauces');

router.get('/', allSauces.allSauces)
module.exports = router;