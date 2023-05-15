const express = require('express')
const app = express()

app.get('/chk',(req,res)=>{
    console.log("APi is working");
})

app.get('/getList',(req,res)=>{
    res.send('<h1>Mangesh BAlkawade<h1>')
})

app.post('/add',(req,res)=>{
    res.end(req.body)
})



// set the engine
app.set('view engine','ejs')

app.get('/profile',(req,res)=>{
    const user={
        name:"Mangesh",
        age:20,
        sub:['c','c++','java']
    }
    res.render('profile',{user})
})

module.exports=app

