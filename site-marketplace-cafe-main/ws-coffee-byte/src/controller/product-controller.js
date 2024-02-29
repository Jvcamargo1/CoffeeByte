'use strict';

require("dotenv").config();
const repository = require("../repositories/product-repository");
const jwt = require("jsonwebtoken");

exports.verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        res.json({
            error: "Você não está autenticado."
        });
    } else {
        const secret = process.env.SECRET;
        jwt.verify(token, secret, (error, decoded) => {
            if(error) {
                res.json({
                    error: "O Token não está correto"
                })
            } else {
                req.body.id_usuario = decoded.id;
                next();
            }
        });
    }
}

exports.getProducts = async(req, res) => {
    try {
        const data = await repository.getProducts();
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
}

exports.getProductFilterId = async(req, res) => {
    try {
        const data = await repository.getProductFilterId(req.body.id);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
}

exports.getUserProducts = async(req, res) => {
    try {
        const data = await repository.getUserProducts(req.body.id_usuario);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
}

exports.getUserProductFilter = async(req, res) => {
    try {
        const data = await repository.getUserProductFilter(req.body.id, req.body.id_usuario);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
}

exports.updateProduct = async(req, res) => {
    const { title, description, price, id, img_src } = req.body;
    const file = req.file;
    try {
        const data = await repository.updateProduct(title, description, price, id, img_src, file);
        res.status(200).json(data);

    } catch(error) {
        res.status(500).json(error);
    }
}

exports.registerProduct = async(req, res) => {
    const { title, description, price, id_usuario } = req.body;
    const file = req.file;
    try {
        const data = await repository.registerProduct(title, description, file.path, price, id_usuario);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        const data = await repository.deleteProduct(req.params.id);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
}