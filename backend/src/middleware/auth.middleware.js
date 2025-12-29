const jwt = require("jsonwebtoken");
const {findByEmail, findById} = require("../validators/ifExist.js");
const cookieParser = require("cookie-parser");


const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(400).json({message: "Unauthorized - No Token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(400).json({message: "Unauthorized - Invalid Token"});
        }

        const user = await findById(decoded.userId);
        delete user.password;

        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        req.user = user;
        
        next();
        

    }catch(err){
        console.log("Error in protectRoute middleware: ", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = protectRoute;