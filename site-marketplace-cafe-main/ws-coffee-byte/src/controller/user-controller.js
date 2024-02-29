'use strict';

require("dotenv").config();
const repository = require("../repositories/user-repository");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;

exports.register = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const data = await repository.register(name, email, password);
        res.status(201).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
}

exports.login = async(req, res) => {
    try {
        const data = await repository.login(req.body.email, req.body.password, res);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
}

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

exports.validation = (req, res) => {
    res.json({
        status: "success"
    });
}

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.json({
        status: "success"
    });
}