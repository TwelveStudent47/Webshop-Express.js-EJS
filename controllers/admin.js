const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
    const editMode = req.params.edit;
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: editMode 
    });
}

exports.postAddProduct = async (req, res) => {
    const { title, imageUrl, price, desc } = req.body;
    try {
        await Product.create({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: desc
        });
        console.log("Successfully created the Product!")
    } catch (err) {
        console.log(err);
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render("admin/products", {
            prods: products,
            path: "/admin/products",
            pageTitle: "Admin Products",
            hasProducts: products.length > 0
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getEditProduct = async (req, res) => {
    const editMode = req.query.edit;
    
    if (!editMode) {
        res.redirect("/");
    }

    const { id } = req.params;
    const productById = await Product.fetchById(id);
    if (!productById) {
        res.redirect("/")
    }

    res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: productById
    });
}

exports.postEditProduct = async (req, res) => {
    const { productId, title, imageUrl, price, desc } = req.body
    const updatedProduct = new Product(productId, title, imageUrl, desc, price)
    await updatedProduct.save()
    res.redirect("/admin/products")
}

exports.postDeleteProduct = (req, res) => {
    const { productId } = req.body
    Product.deleteById(productId)
    res.redirect("/admin/products")
}