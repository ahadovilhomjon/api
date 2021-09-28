const Product = require('../models/productModel');
const Joi = require('joi');

// @desc   Get All Products
// @route  GET /api/products
// @access Private/User

const getProducts = async (req, res) => {
    const [rows, fields] = await Product.getProducts();
    if (rows.length === 0) return res.send('Omborda mahsulot yo`q');
    res.json(rows);
}

// @desc   Get Product By Id
// @route  GET /api/products/:id
// @access Private/User

const getProductById = async (req, res) => {
    const [rows, fields] = await Product.getProductById(req.params.id);
    if (rows.length === 0) return res.send('Mahsulot topilmadi.');
    res.json(rows)
}

// @desc   Post New Product
// @route  POST /api/products
// @access Private/Admin

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().required(),
        about: Joi.string().required(),
        manufacturer: Joi.string(),
        price: Joi.number()
    })

    return schema.validate(product);
}

const postProduct = async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = new Product(req.body.name, req.body.about, req.body.manufacturer, req.body.price);
    await Product.postProduct(product);
    res.status(201).send('Mahsulot muvaffaqiyatli omborga qo`shildi.')
}

// @desc   Update Product By Id
// @route  PUT /api/products/:id
// @access Private/Admin

const updateProduct = async (req, res) => {
    await Product.updateProductById(req.params.id, req.body);
    res.send('Mahsulot muvaffaqiyatli o`zgartirildi.');
}

// @desc   Delete Product By Id
// @route  DELETE /api/products/:id
// @access Private/Admin

const deleteProduct = async (req, res) => {
    await Product.removeProductById(req.params.id);
    res.send('Mahsulot o`chirildi');
}

module.exports = {
    getProducts, 
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct
}