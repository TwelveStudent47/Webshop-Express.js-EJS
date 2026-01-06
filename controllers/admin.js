const Product = require("../models/product")

exports.getAddProduct = (req, res) => {
    res.render("admin/add-product", 
        {
            pageTitle: "Add Product",
            path: "/admin/add-product"
        }
    )
}

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render("admin/products",
            {
                prods: products,
                path: "/admin/products",
                pageTitle: "Admin Products",
                hasProducts: products.length > 0
            }
        )
    })
}

exports.postAddProduct = (req, res) => {
    const { title, imageUrl, price, desc } = req.body
    const product = new Product(title, imageUrl, price, desc)
    product.save()
    res.redirect("/")
}