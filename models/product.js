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
        try {
            Pool.query("UPDATE products SET title = $1, price = $2, description = $3, imageurl = $4 WHERE id = $5", [this.title, this.price, this.desc, this.imageUrl, this.id]);
        } catch (err) {
            console.log(err)
        }
        
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

    static async fetchById(id) {
    try {
        const data = await Pool.query("SELECT * FROM products WHERE id = $1", [id]);
        return data.rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

    static deleteById(id) {
        
    }
}