const db = require('../connectDb');

class User {
    constructor(name, phone, email, password) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }

    static getUsers() {
        return db.promise().query('SELECT id, name, phone, email FROM users')
    }

    static getUserById(id) {
        return db.promise().query('SELECT id, name, phone, email FROM users WHERE id = ?', id)
    }

    static getUserByEmail(email) {
        return db.promise().query('SELECT * FROM users WHERE email = ?', email)
    }

    static postUser(user) {
        return db.promise().query('INSERT INTO users SET ?', user)
    }
}


module.exports = User;

