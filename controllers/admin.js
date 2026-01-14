const Product = require("../models/product")

exports.getAddProduct = (req, res) => {
    const editMode = req.params.edit
    res.render("admin/edit-product", 
        {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            editing: editMode 
        }
    )
}

exports.postAddProduct = (req, res) => {
    const { title, imageUrl, price, desc } = req.body
    const product = new Product(title, imageUrl, price, desc)
    product.save()
    res.redirect("/")
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

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit
    
    if (!editMode) {
        res.redirect("/")
    }

    const { id } = req.params
    Product.fetchById(id, product => {
        if (!product) {
            res.redirect("/")
        }

        res.render("admin/edit-product", 
            {
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
                product: product
            }
        )  
    })
}

exports.postEditProduct = (req, res) => {
    
}