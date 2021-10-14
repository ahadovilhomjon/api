const db = require('../connectDb');

class Product {
    constructor(name, about, manufacturer, price) {
        this.name = name;
        this.about = about;
        this.manufacturer = manufacturer;
        this.price = price;
    }

    static getProducts() {
        return db.promise().query('SELECT * FROM products');
    }

    static getProductById(id) {
        return db.promise().query('SELECT * FROM products WHERE id = ?', id)
    }

    static postProduct(product) {
        return db.promise().query('INSERT INTO products SET ?', product)
    }

    static updateProductById(id, product) {
        return db.promise().query('UPDATE products SET name = ?, about = ?, manufacturer = ?, price = ? WHERE id = ?', [product.name, product.about, product.manufacturer, product.price, id])
    }

    static removeProductById(id) {
        return db.promise().query('DELETE FROM products WHERE id = ?', id)
    }
}



// Comment

module.exports = Product;