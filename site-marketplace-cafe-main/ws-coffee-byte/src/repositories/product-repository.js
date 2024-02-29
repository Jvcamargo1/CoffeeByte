'use strict';

require("dotenv").config();
const db = require("../db");
const fs = require("fs");

exports.getProducts = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM cafe";
        db.query(sql, (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

exports.getProductFilterId = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT cafe.*, usuario.email FROM cafe INNER JOIN usuario ON cafe.id = ?";
        db.query(sql, id, (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

exports.getUserProducts = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM cafe WHERE id_usuario = ?";
        db.query(sql, id, (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

exports.getUserProductFilter = (id, id_usuario) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM cafe WHERE id = ? and id_usuario = id_usuario";
        db.query(sql, [id, id_usuario], (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

exports.updateProduct = (title, description, price, id, img_src, file) => {
    return new Promise((resolve, reject) => {
        if(!file) {
            const sql = "UPDATE cafe SET title = ?, description = ?, price = ? WHERE id = ?";
            db.query(sql, [title, description, price, id], (error, result) => {
                if(error) {
                    reject(error);
                } else {
                    resolve({ status: "success"});
                }
            });
        } else {
            const sql = "UPDATE cafe SET title = ?, description = ?, img_src = ?, price = ? WHERE id = ?";
            db.query(sql, [title, description, file.path, price, id], (error, result) => {
                if(error) {
                    reject(error);
                } else {
                    if(file) {
                        fs.unlinkSync(img_src);
                        resolve({ status: "success"});
                    }
                }
            });
        }
    });
}

exports.registerProduct = (title, description, path, price, id) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO cafe VALUES (default, ?, ?, ?, ?, ?)";
        db.query(sql, [title, description, path, price, id], error => {
            if(error) {
                reject(error);
            } else {
                resolve({
                    status: "success"
                })
            }
        });
    });
}

exports.deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT img_src FROM cafe WHERE id = ?";
        db.query(sql, id, (error, result) => {
            if(error) {
                reject(error);
            } else {
                if(result.length > 0) {
                    const { img_src } = result[0];
                    const sql = "DELETE FROM cafe WHERE id = ?";
                    db.query(sql, id, error => {
                        if(error) {
                            reject(error);
                        } else {
                            fs.unlinkSync(img_src);
                            resolve({
                                status: "success"
                            });
                        }
                    });
                }
            }
        });
    });
}