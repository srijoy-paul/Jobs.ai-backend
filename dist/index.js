"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const pool = require('./db');
const appRouter = require('./Routes/AppRoutes');
const authRouter = require('./Routes/AuthRoutes');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", appRouter);
app.use("/api/v1/auth", authRouter);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running at port number=${PORT}`);
});
//# sourceMappingURL=index.js.map