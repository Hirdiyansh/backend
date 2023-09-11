const mongoose=require('mongoose');
const mongoURI='mongodb://localhost:27017/yogify';
const connectToMongo= async ()=>{
    mongoose.connect(mongoURI, await console.log("Connected To mongo successfully")
    );
}
module.exports=connectToMongo;