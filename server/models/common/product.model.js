const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    departmentId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Department',
       required:true
    },
    product:{
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

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
