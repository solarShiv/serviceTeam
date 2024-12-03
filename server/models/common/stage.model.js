const mongoose = require('mongoose');

const stageSchema = mongoose.Schema({
    stage:{
        type:String,
        required:true
    },
    created_At:{
        type:Date,
        required:true,
        default:Date.now
    },
    updated_At:{
        type:Date
    },
    created_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    },
    updated_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    }
})

const Stage = mongoose.model("Stage", stageSchema);

module.exports = Stage;