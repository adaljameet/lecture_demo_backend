const jwt = require('jsonwebtoken')

const auth = async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                message: "Token Required..."
            })
        }
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode;
        next();
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid or Expired Token..."
        })
    }
}

module.exports = auth;