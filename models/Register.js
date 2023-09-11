const mongoose = require('mongoose')
const RegisterSchema = new mongoose.Schema({
    name : {type : String, required : true },
    phone : {type : Number, required : true },
    email : {type : String, required : true, unique : true},
    password:{type:String, required:true},
    subsc:{type:String,required:true}
},{timestamps : true});

mongoose.models = {};

module.exports = mongoose.model('register',RegisterSchema);