const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const {
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
} = require('../controllers/productController');

router.get('/', auth, getProduct);
router.post('/', postProduct);
router.put('/:id', putProduct);
router.delete('/:id', deleteProduct);

module.exports = router