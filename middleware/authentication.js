const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokens=req.cookies[cookieName]
        if(!tokens){
      return next();
    }
    try{
    const userpayload=validateToken(tokens);
    req.user=userpayload;
    }
    catch(error){}
    return next();
}
}

module.exports={checkForAuthenticationCookie};