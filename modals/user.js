
const mongoose = require('mongoose');


//User Schema
const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    t_o_c:{
        type: String,
        required: true
    },
    event_name:{
        type: String,
        required: true
    },
    event_pos:{
        type: Number,
        required: true
    }, 
    password:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        required: true
    },
    designation: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);