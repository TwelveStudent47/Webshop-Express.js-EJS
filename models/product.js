const Cart = require("./cart")
const Pool = require("../util/database")

// Amikor beimportáljuk a modult, akkor ez az osztály lesz érvényben
module.exports = class Product {
    constructor(id, title, imageUrl, desc, price) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.desc = desc
        this.price = price
    }

    // Mentés funkció
    save() {
        const data = Pool.query("INSERT INTO products (title, price, description, imageurl) VALUES ($1, $2, $3, $4)",
            [this.title, this.price, this.desc, this.imageUrl])
    }

    // Statikus függvény ami alapján visszakapjuk a címeket
    static fetchAll() {
        try {
            const data = Pool.query("SELECT * FROM products;");
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    static fetchById(id) {
        
    }

    static deleteById(id) {
        
    }
}