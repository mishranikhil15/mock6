
const jwt=require('jsonwebtoken');
require('dotenv').config()

const authentication=(req,res,next)=>{
    const token=req.headers.authorization;
    // console.log(token,"1");
    try {
        if(token){
            const decode=jwt.verify(token,process.env.key)
            // console.log(decode);
            const user_id=decode.UserID
            if(decode){
                req.body.UserID=user_id;
                next();
            }
        }else{
            res.json({"msg":"Not Authorized"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error While Verifying"})

    }
}

module.exports={
    authentication
}