const express = require("express");
const router = express.Router();
const allSauces = require( '../controllers/sauces');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');


router.get('/', auth , allSauces.allSauces)
router.get('/:id', auth, allSauces.getSauce)
router.post('/', auth, multer, allSauces.createSauce)
router.put('/:id', auth, allSauces.updateSauce)
router.delete('/:id', auth, allSauces.deleteSauce)
router.delete('/:id/:like', auth, allSauces.deleteLike)
module.exports = router;