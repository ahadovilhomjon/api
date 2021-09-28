const express = require('express');
require('dotenv').config();
require('express-async-errors');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const auth = require('./routes/auth');
const error = require('./middleware/error');


app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/auth', auth);

app.use(error);

app.get('/', (req, res) => {
    res.send('Hi there');
})

const port = 3000;

app.listen(port, () => {
    console.log(`server  running on ${port} port`)
})