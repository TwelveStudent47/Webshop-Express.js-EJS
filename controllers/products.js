const Product = require("../models/product")

// Amikor meghívják akkor berendereli a "add-product" view-t, 
// az oldal címét, 
// és az elérési utat.
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { 
        pageTitle: 'Add Product',
        path: '/admin/add-product', 
    });
}

// POST request arra amikor a felhasználó hozzáad egy terméket, 
// létrehoz egy új instance-t a "Product" classból, 
// elmenti az adott elemet, 
// visszairányít a kezdőoldalra
exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/');
}

// Amikor megívják akkor beolvassa a fájlt, 
// kiveszi belőle a listát, 
// berendereli a "shop" view-t, 
// prods-nak visszaadja a listát, 
// az oldal címét, 
// az útvonalát, 
// van-e termék, ez akkor igaz, ha a lista hossza nagyobb, mint 0
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
        });
    }))
}