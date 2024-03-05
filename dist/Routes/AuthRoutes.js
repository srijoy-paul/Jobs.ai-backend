"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const pool = require("../db");
const authRouter = express.Router();
const passport = require("passport");
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
authRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, typeof email, password);
    // const response=await pool.query('SELECT * FROM candidate WHERE email=$1', [email]);
    // console.log(response.rows[0]);
    // res.send("successfull")
    // console.log(response.rows.length===0);
    passport.use(new LocalStrategy(function verify(email, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield pool.query('SELECT * FROM candidate WHERE email=$1', [email]);
            (() => __awaiter(this, void 0, void 0, function* () {
                if (response.rows.length == 0) {
                    return done(null, false, { message: 'Incorrect username or password.' });
                }
                yield bcrypt.compare(password, response.rows[0].password, (err, isValid) => {
                    if (err) {
                        return done(err);
                    }
                    if (!isValid) {
                        return done(null, false, { message: 'Incorrect username or password.' });
                    }
                    return done(null, response.rows[0]);
                });
                //   crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
                //     if (err) { return done(err); }
                //     if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
                //       return done(null, false, { message: 'Incorrect username or password.' });
                //     }
                //     return done(null, row);
                //   });
            }))();
        });
    }));
}));
module.exports = authRouter;
//# sourceMappingURL=AuthRoutes.js.map