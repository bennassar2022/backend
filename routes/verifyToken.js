const jwt=require('jsonwebtoken');
module.exports= function (req,res,next) {
    const token=req.header("auth-token")
    if(!token)return res.status(401).send('access denied')
    try{
        const verifed=jwt.verify(token,process.env.TOKEN_SECRET)//verified contain id  of token 
        req.user=verified; 
        next()
    }catch(err){
        res.status(400).send("invali Token")
    }
}
