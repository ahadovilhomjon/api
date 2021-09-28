const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.post('/', async (req, res) => {
    const [rows, fields] = await User.getUserByEmail(req.body.email);
    if (rows.length === 0) return res.send('Email yoki parol xato kiritilgan!');

    const validPassword = await bcrypt.compare(req.body.password, rows[0].password);
    if (!validPassword) return res.send('Email yoki parol xato kiritilgan!');

    const token = jwt.sign({id: rows[0].id, isAdmin: rows[0].isAdmin}, process.env.SECRET_KEY, {expiresIn: '7d'});

    res
        .header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send('Siz muvaffaqiyatli tizimga kirdingiz.');
})


module.exports = router;

