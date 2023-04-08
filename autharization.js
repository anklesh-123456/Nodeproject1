const jwt = require("jsonwebtoken");
const usermodel = require("./database");

const auth = async(req,res,next)=>{
    try{
        const token =req.cookies.jwt;
        const verify = jwt.verify(token,"czazsdfsdgvsdfgfgfgdfgvshrfgedgsggsgs");
        console.log(verify)
        next();

    }catch(error){
        res.status(400).send(error);
    }
}
module.exports = auth;