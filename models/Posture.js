const mongoose = require('mongoose')
const PostureSchema = new mongoose.Schema({
    title : {type : String, required : true },
    desc : {type : String, required : true },
    img : {type : String, required : true},
},{timestamps : true});

mongoose.models = {};

module.exports = mongoose.model('posture',PostureSchema);