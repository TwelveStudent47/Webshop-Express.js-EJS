const Product = require("../models/product")

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