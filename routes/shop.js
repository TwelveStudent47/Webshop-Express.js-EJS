const express = require('express');
const shopController = require("../controllers/shop")

const router = express.Router();

router.get('/', shopController.getIndex);

router.get("/products", shopController.getProducts)

router.get("/products/:productId", shopController.getCurrentProduct)

router.get("/cart", shopController.getCart)

router.post("/cart", shopController.postProductToCart)

router.post("/delete-from-cart", shopController.postCartDeleteProduct)

router.get("/checkout", shopController.getCheckout)

router.get("/orders", shopController.getOrders)

module.exports = router;