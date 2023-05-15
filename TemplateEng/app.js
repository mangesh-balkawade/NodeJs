const express=require('express')
const routes=require('./api/api.js')
const parser=require('body-parser')
const app=express()

app.use(parser)
app.use(parser.json())
app.use(express.json())

app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000");
})

app.use(routes)