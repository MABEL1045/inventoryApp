const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const {
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
} = require('../controllers/productController');

router.get('/', auth, getProduct);
router.post('/create', postProduct);
router.put('/:id', putProduct);
router.delete('/:id', deleteProduct);

module.exports = router