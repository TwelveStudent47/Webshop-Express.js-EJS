const fs = require("fs")
const path = require("path")

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
)

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Az eddigi kosár betöltése,
        fs.readFile(p, (err, fileContent) => {
            let cart = 
            {
                products: [],
                totalPrice: 0
            }

            if (!err) {
                cart = JSON.parse(fileContent)
            }

            // megnézni van-e benne már ebből,
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct
            // ha van növeljük az értéket
            if (existingProduct) {
                updatedProduct = {...existingProduct}
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = {id: id, qty: 1}
                cart.products = [...cart.products, updatedProduct]
            }

            cart.totalPrice = cart.totalPrice + +productPrice

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err)
            })
        })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, cart) => {
            if (err) {
                console.log(err);
                return;
            }

            const updatedCart = {...JSON.parse(cart)};
            const product = updatedCart.products.find(product => product.id === id);
            
            if (!product) {
                return;    
            }

            const productQty = product.qty;

            updatedCart.totalPrice = cart.totalPrice - productPrice * productQty;
            updatedCart.products = updatedCart.products.filter(product => product.id !== id);

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    static getProducts(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
}