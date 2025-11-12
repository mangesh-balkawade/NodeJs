const mongoose=require('mongoose')

const employ=new mongoose.Schema(
    {
        name:
        {
            type:String
        },
        email:
        {
            type:String
        },
        age1:
        {
            type:Number
        }
    }
);

const emp=mongoose.model('employ',employ)

module.exports=emp