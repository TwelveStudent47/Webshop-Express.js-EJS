const Product = require("../models/product")
const Cart = require("../models/cart")

exports.getProducts = async (req, res) => {
    const products = await Product.fetchAll();
    const productsData = products.rows;
    res.render("shop/product-list", 
            {
                prods: productsData,
                path: "/products",
                pageTitle: "Products",
                hasProducts: productsData.length > 0
            }
        );
}

exports.getIndex = async (req, res) => {
    const products = await Product.fetchAll();
    const productsData = products.rows;
    res.render("shop/index", {
        prods: productsData,
        path: "/",
        pageTitle: "Shop",
        hasProducts: productsData.length > 0
    });
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