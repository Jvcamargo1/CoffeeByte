'use strict';

require("dotenv").config();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;

exports.register = (name, email, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (error, hash) => {
            if(error) {
                reject(error);
            } else {
                const sql = "INSERT INTO usuario (name, email, password) VALUES (?, ?, ?)";
                db.query(sql, [name, email, hash], (error, result) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve({ status: "success" });
                    }
                })
            }
        });
    })
}

exports.login = (email, password, res) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM usuario WHERE email = ?";
        db.query(sql, [email], (error, result) => {
            if(error) {
                reject(error);
            } else {
                if(result.length > 0) {
                    const { name, id } = result[0];
                    bcrypt.compare(password, result[0].password, (error, result) => {
                        if(result) {
                            const secret = process.env.SECRET;
                            const token = jwt.sign({
                                name,
                                id
                            }, secret, {
                                expiresIn: "1h"
                            });
                            res.cookie("token", token);
                            resolve({ status: "success" });
                        } else {
                            reject({ status: "Não foi possível logar" });
                        }
                    });
                }
            }
        })
    });
}