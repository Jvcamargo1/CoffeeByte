'use strict';

const router = require("express").Router();
const userController = require("../controller/user-controller");

// registra um novo usuário
router.post("/register", userController.register);

// loga um usuário, retornando um token
router.post("/login", userController.login);

// valida se o token é válido
router.get("/validation", userController.verifyUser, userController.validation);

// desloga o usuário
router.get("/logout", userController.logout)

module.exports = router;