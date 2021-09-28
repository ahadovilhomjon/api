module.exports = async (req, res, next) => {
    if (req.user.isAdmin === 0) return res.status(403).send('Sizda Adminlik huquqi mavjud emas');
    next();
}