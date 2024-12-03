const mongoose = require('mongoose');

const districtSchema = mongoose.Schema({
    stateId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'State',
       required:true
    },
    district:{
        type:[String],
        required:true
    },
    create_At:{
        type:Date,
        default:Date.now
    }
});

const District = mongoose.model("District", districtSchema);

module.exports = District;
