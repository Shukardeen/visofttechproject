const mongoose=require('mongoose');

const dbConfig=async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/techtalks');
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

module.exports=dbConfig;
