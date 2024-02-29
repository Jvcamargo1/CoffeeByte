'use strict';

const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true
}));
app.use("/uploads", express.static("./uploads"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser());

const productRouter = require("./routes/product-router");
const userRouter = require("./routes/user-router");

app.use("/", productRouter);
app.use("/", userRouter);

module.exports = app;