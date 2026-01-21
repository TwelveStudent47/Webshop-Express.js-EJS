const fs = require("fs")
const path = require("path")
const pathMod = require("../util/path")
const Cart = require("./cart")

// Létrehozza azt az elérési utat, ahol a könyv címek vannak: "D:\My Codes\Node\ejs-01\data\products.json"
const routeToData = path.join(pathMod, "data", "products.json")

// Beolvassa a fájlból az adatokat, ha nincs adat akkor egy üres listát ad vissza
const getProductsFromFile = cb => {
    fs.readFile(routeToData, (err, fileContent) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(fileContent.toString()))
        }
    })
}

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
        // A funkció meghvásakor a "products"-ra hivatkozunk, mint lista, 
        // ekkor hozzáadjuk ezt az objuktumot ami a Object típussal rendelkezik,
        // ezután beleírjuk a fájlba a JSON formátumba alakított listát,
        // hiba esetén kiírjuk a hibát.
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProducts = [...products]
                updatedProducts[existingProductIndex] = this
                fs.writeFile(routeToData, JSON.stringify(updatedProducts), err => {
                    if (err) {
                        console.log(err)
                    }
                })
            } else {
                this.id = Math.random().toString();
                products.push(this)
                fs.writeFile(routeToData, JSON.stringify(products), err => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    }

    // Statikus függvény ami alapján visszakapjuk a címeket
    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static fetchById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id)
            cb(product)
        })
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            const updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(routeToData, JSON.stringify(updatedProducts), err => {
                if (err) {
                    console.log(err);
                }
                Cart.deleteProduct(id, product.price)
            });
        });
    }
}