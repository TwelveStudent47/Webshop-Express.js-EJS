const Product = require("../models/product")
const Cart = require("../models/cart")
exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render("shop/product-list", 
            {
                prods: products,
                path: "/products",
                pageTitle: "Products",
                hasProducts: products.length > 0
            }
        )
    })
}

exports.getIndex = (req, res) => {
    Product.fetchAll(products => {
        res.render("shop/index", 
            {
                prods: products,
                path: "/",
                pageTitle: "Shop",
                hasProducts: products.length > 0
            }
        )
    })
}

exports.getCart = (req, res) => {
    res.render("shop/cart",
        {
            path: "/cart",
            pageTitle: "Your Cart"
        }
    )
}

exports.postProductToCart = (req, res) => {
    const { productId } = req.body
    Product.fetchById(productId, (product) => {
        Cart.addProduct(productId, product.price)
    })
    res.redirect("/cart")
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

exports.getCurrentProduct = (req, res) => {
    const { productId } = req.params
    Product.fetchById(productId, product => {
        res.render("shop/product-detail",
            {
                product: product,
                pageTitle: product.title,
                path: "/products"
            }
        )
    })
}