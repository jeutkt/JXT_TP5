let jwt=require('jsonwebtoken')
const fs=require('fs')
const bcrypt= require('bcrypt')


const  usersModel=require('./users')


//read private and public key
var privateKEY = fs.readFileSync('./jwtRS256.key', 'utf8');
var publicKey = fs.readFileSync('./jwtRS256.key.pub','utf8')


const login=(login,password)=>{
    const hashlogin=findhash(login)
    bcrypt.compare(password, hashlogin, function(err, res) {
        if(res){
            return jwt.sign(login, privateKey, { algorithm: 'RS256' }, function(err, token) {
                console.log(token);
              });
            }
        else{
            return false
            }
        
    });
}
        
         
    
  


const findhash=(login)=>{
    return (usersModel.get(login).password)
}


const verifyacces=(token)=>{
    jwt.verify(token,publicKey,function(err,decoded){
        if(err){
            return false
        }
        else{
            return decoded
        }
        
    })
}

exports.login=login
exports.verifyacces=verifyacces 
