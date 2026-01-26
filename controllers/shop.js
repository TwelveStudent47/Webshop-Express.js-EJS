const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render("shop/index", {
            prods: products,
            path: "/",
            pageTitle: "Shop",
            hasProducts: products.length > 0
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render("shop/product-list", {
            prods: products,
            path: "/products",
            pageTitle: "Products",
            hasProducts: products.length > 0
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByPk(productId);
        res.render("shop/product-detail.ejs", {
            product: product,
            path: "/product",
            pageTitle: "Test"
        }); 
    } catch (err) {
        console.log(err);
    }
}

exports.getCart = (req, res) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render("shop/cart",
                {
                    path: "/cart",
                    pageTitle: "Your Cart",
                    products: cartProducts
                }
            );
        });
    });
}

exports.postProductToCart = (req, res) => {
    const { productId } = req.body
    Product.fetchById(productId, (product) => {
        Cart.addProduct(productId, product.price)
    })
    res.redirect("/cart")
}

exports.postCartDeleteProduct = (req, res) => {
    const { productId } = req.body;
    Product.fetchById(productId, product => {
        Cart.deleteProduct(productId, product.price)
        res.redirect("/cart")
    })
}

exports.getCheckout = (req, res) => {
    res.render("shop/checkout", 
        {
            path: "/checkout",
            pageTitle: "Checkout"
        }
    )
}

exports.getOrders = (req, res) => {
    res.render("shop/orders",
        {
            path: "/orders",
            pageTitle: "Your Orders"
        }
    )
}