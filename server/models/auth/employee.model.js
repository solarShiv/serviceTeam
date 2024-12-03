const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    empId:{
        type:String,
        required:true,
        unique:true,
        maxLength:7,
        minLength:4
    },
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        maxLength:10,
        minLength:10,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Admin', 'Service','Warehouse'],
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
    },
    refreshToken:{
        type:String
    }
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee; 