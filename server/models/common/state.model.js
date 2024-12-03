const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
    state:{
        type:String,
        required:true
    },
    create_At:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const State = mongoose.model("State", stateSchema);

module.exports = State;