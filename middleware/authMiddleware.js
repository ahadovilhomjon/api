const jwt = require('jsonwebtoken');

module.exports = async (req,res, next) => {
    const token = req.header('authorization');
    if (!token) return res.status(401).send('Sizning tokeningiz mavjud emas');

    req.user = jwt.verify(token, process.env.SECRET_KEY);
    next();
}

