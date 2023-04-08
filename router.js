
const express = require("express");
const Router = express.Router();
const user = require("./database");
const bcrypt = require("bcryptjs");
const cookieparser = require("cookie-parser");
const auth = require("./autharization");

Router.get("/", (req,res)=>{
    res.render("index");
    
})

Router.get("/loginn", (req,res)=>{

    res.render("login");
});
Router.get("/auth",auth, (req,res)=>{

    res.render("auth");
});

Router.post("/register", async(req,res)=>{
    try{
        const data = new user(req.body);
        if(data.password === data.confpassword){
            const emailvalidation = await user.findOne({email:data.email})
            if(emailvalidation){
                res.send("his email already exist plz login")
            }

            const token = await data.generateToken();
            console.log("this token for user"+token)

            res.cookie("jwt",token);

            const savedata = await data.save();
            res.render("login");
        }else{
            res.status(400).send("this is not right fill correct detail");
        }
        
        

    }catch(error){
        res.status(400).send(error);
    } 
})
Router.post("/login", async(req, res)=>{
    try{
        const passworduser = req.body.password;
        const checkemail = req.body.email;
        const databasedata = await user.findOne({email:checkemail})
        const ismatch = await bcrypt.compare(passworduser,databasedata.password);
        
        if(ismatch){
            const token = await databasedata.generateToken();
            res.cookie("jwt",token);
            res.render("contact");
        }else{
            res.status(400).send("this is not right fill correct detail");
        }
       
    }catch(error){
        res.status(400).send(error);

    }

})
module.exports = Router;