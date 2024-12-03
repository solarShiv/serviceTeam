const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    stateId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'State',
       required:true
    },
    department:{
        type:String,
        required:true
    },
    created_By:{
          type:String,
          required:true,
    },
    updated_By:{
        type:String
    },
    create_At:{
        type:Date,
        default:Date.now
    },
    updated_At:{
        type:Date
    }
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
