const express=express()
const router=express.Router();
const idp=require('./../model/idp')



router.post('/v1/auth/login',(req,res)=>{
    const login=req.login
    const password=req.password
    if( login && password){
    let token=idp.login(login,password)
        if(token){
            return res.status(200).json({
                message="ok",
                token=token            
            })
        }
        else{
            return res.status(401).json({
                message="unauthorized"
            })
        }
        }
})

router.get('/v1/auth/verifyaccess',(req,res)=>{
   const token =req.headers['x-access-token']
   const accesok=idp.verifyacces(token)
   if(!token || !accesok){
       return res.status(401).json({
           message="unauthorized",
       })
   }
   else{
       return res.status(200).json({
           message:"ok",
           token=token
       })
   }
    
}
    




