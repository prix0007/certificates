
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
    team_name:{
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    certificate_id: {
        type: Number,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);