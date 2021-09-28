const express = require('express');
const router = express.Router();
const { getProducts, getProductById, postProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/admin');


router.route('/')
    .get(auth, getProducts)
    .post(auth, admin, postProduct);

router.route('/:id')
    .get(auth, getProductById)
    .put(auth, admin, updateProduct)
    .delete(auth, admin, deleteProduct);

module.exports = router;