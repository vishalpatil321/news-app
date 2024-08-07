const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'First name is required.']
    },
    lastName:{
        type:String,
        required:[true,'Last name is required.']
    },
    phone:{
        type:Number,
        required:[true,'Phone number is required.']
    },
    email:{
        type:String,
        required:[true,'Email is required.']
    },
    password:{
        type:String,
        required:[true,'Password is required.']
    },
});

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;