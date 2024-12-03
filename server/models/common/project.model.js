const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    productId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Product',
       required:true
    },
    project:{
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

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
