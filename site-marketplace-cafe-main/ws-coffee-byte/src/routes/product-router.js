'use strict';

const router = require("express").Router();
const productController = require("../controller/product-controller");
const multer = require("../../config/multer");

// obtém as informações de todos os produtos
router.get("/products", productController.getProducts);

// obtém as informações de um único produto filtrado por id
router.post("/product-filter-id", productController.getProductFilterId);

// obtém as informações dos produtos de um usuário específico
router.get("/user-products", productController.verifyUser, productController.getUserProducts);

// obtém as informações de um produto específicio de um usuário específico
router.post("/user-product-filter", productController.verifyUser, productController.getUserProductFilter);

// atualiza as informações de um produto específicio de um usuário específico
router.post("/update-product", multer.single("file"), productController.verifyUser, productController.updateProduct);

// cadastro de um produto
router.post("/register-product", multer.single("file"), productController.verifyUser, productController.registerProduct);

// deleta um produto com base no seu id
router.delete("/delete-product/:id", productController.verifyUser, productController.deleteProduct);

module.exports = router;