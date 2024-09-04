import mongoose from "mongoose";

const connectionDB = ()=>{
    mongoose.connect(
        process.env.MONGO_URL
    )
    .then(()=>{
        console.log("MongoDB is connected");
    })
    .catch((err)=>{
        console.log("Connection Error :", err.message);
    });
} 

export default connectionDB;