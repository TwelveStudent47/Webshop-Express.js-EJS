const fs = require("fs")
const path = require("path")
const pathMod = require("../util/path")

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
    constructor(title) {
        this.title = title
    }

    // Mentés funkció
    save() {
        // A funkció meghvásakor a "products"-ra hivatkozunk, mint lista, 
        // ekkor hozzáadjuk ezt az objuktumot ami a Object típussal rendelkezik,
        // ezután beleírjuk a fájlba a JSON formátumba alakított listát,
        // hiba esetén kiírjuk a hibát.
        getProductsFromFile(products => {
            console.log(this)
            products.push(this)
            fs.writeFile(routeToData, JSON.stringify(products), err => {
                console.log(err)
            })
        })
    }

    // Statikus függvény ami alapján visszakapjuk a címeket
    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
}