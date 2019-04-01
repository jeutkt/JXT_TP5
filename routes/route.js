const express=require('express')
const parser=require('body-parser')
const uuidv1 = require('uuid/v1');
const app =express()

users=[
    {
     id:16000376,
     login:"jeutkt",
     name:"mohammad",
     age:21
     },
     {
         id:16015613,
         login:"barry",
         name:"daouda",
         age:24  
     },
     {
         id:16013153,
         login:"squalalah",
         name:"clement",
         age:25  
     }
 ]



app.get('/users',function(req,res){
    res.status(200).json({
        users
    })
})

app.get('/users/:userId',function(req,res){
    console.log("eee"+req.params.userId)

    const tmp_user =users.filter((user)=>{
        user.id==req.params.userId 
    })
    user=tmp_user[0]
    if(tmp_user.length<1){
        res.status(204)
        }
     else{
         res.status(200).json(
             user
         )
     }   

    
    
})

.get('/users/:userId/:name',function(req,res){
    const tmp_user =users.filter((user)=>{
        user.id===req.params.userId 
    })
    const user=""
    user=tmp_user[0]
    if(user===""){
        res.status(204).send(
            "no user"
        )
        }
     else{
    res.status(200).json(
        user.name
    )
     }
})

.delete('/users/:userId',function(req,res){
   
 
})

.put('/user/:userId',function(req,res){
  
})
