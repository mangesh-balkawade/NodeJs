const { default: mongoose } = require("mongoose");

const emp=new mongoose.Schema({
    name:{
        type:String
    },
    eid:{
        type:Number
    },
    sal:{
        type:Number
    }
})

const employee=mongoose.model("employee",emp)

module.exports=employee

