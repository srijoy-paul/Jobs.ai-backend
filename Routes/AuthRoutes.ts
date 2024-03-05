const express=require("express");
const pool=require("../db");
const authRouter=express.Router();

const passport= require("passport");
const LocalStrategy=require('passport-local');
const crypto=require('crypto');


authRouter.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
    console.log(email, typeof email,password);
    // const response=await pool.query('SELECT * FROM candidate WHERE email=$1', [email]);
    // console.log(response.rows[0]);
    // res.send("successfull")
    // console.log(response.rows.length===0);
    
    
    passport.use(new LocalStrategy(async function verify(email, password, done) {
        const response=await pool.query('SELECT * FROM candidate WHERE email=$1', [email]);
        (async()=> {
          if (response.rows.length==0) { return done(null, false, { message: 'Incorrect username or password.' }); }
      
          await bcrypt.compare(password,response.rows[0].password,(err,isValid)=>{
            if(err){
                return done(err);
            }
            if(!isValid){
                return done(null,false,{ message: 'Incorrect username or password.' });
            }
            return done(null,response.rows[0]);
          });

        //   crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        //     if (err) { return done(err); }
        //     if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        //       return done(null, false, { message: 'Incorrect username or password.' });
        //     }
        //     return done(null, row);
        //   });
        })();
      }));
});

module.exports=authRouter;
export{}