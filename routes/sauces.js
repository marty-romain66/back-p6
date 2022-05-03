const express = require("express");
const router = express.Router();
const allSauces = require( '../controllers/sauces');
const multer = require('../middleware/multer-config');


router.get('/', allSauces.allSauces)
router.get('/:id', allSauces.getSauce)
router.post('/', multer, allSauces.createSauce)
router.put('/:id', allSauces.updateSauce)
router.delete('/:id', allSauces.deleteSauce)
module.exports = router;