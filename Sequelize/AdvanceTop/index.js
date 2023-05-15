const express=require('express')
const routes=require('./api/api')
const app=express()

const parser=require('body-parser')

app.listen(3000,(req,res)=>{
    console.log("Server is started");
})


app.use(parser.json())
app.use(express.json())
app.use(routes)