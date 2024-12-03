const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    created_At:{
        type:Date,
        default:Date.now
    },
    updated_At:{
        type:Date
    },
    created_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
        required:true
    },
    updated_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    }
});
const Company = mongoose.model("Company",companySchema);
module.exports = Company;