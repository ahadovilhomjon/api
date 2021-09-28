const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

// @desc   Get All Users
// @route  GET /api/users
// @access Private/Admin

const getUsers = async (req, res) => {
    const [rows, fields] = await User.getUsers();
    res.json(rows);
}

// @desc   Get User By Id
// @route  GET /api/users/:id
// @access Private/Admin

const getUserById = async (req, res) => {
    const [rows, fields] = await User.getUserById(req.params.id);
    //if (rows.length === 0) return res.send('Foydalanuvchi topilmadi');
    res.json(rows);
}

// @desc   Post New User
// @route  POST /api/users
// @access Public

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        phone: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().min(7).max(15).required()
    })

    return schema.validate(user);
}

const registerUser = async (req, res) => {

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
     
    let [rows, fields] = await User.getUserByEmail(req.body.email);
    if (rows.length) return res.send('Bu foydalanuvchi tizimda mavjud.');

    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User(req.body.name, req.body.phone, req.body.email, encryptedPassword);

    await User.postUser(user);

    res.send('Siz muvaffaqiyatli ro`yhatdan o`tdingiz');
}



module.exports = {
    getUsers,
    getUserById,
    registerUser
}