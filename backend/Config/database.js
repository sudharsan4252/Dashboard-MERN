import mongoose from "mongoose";
import seedDatabase from "../Models/seed.js";
export const connectDB = async()=>{
    await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'Dashboard-MERN'}).then(()=>console.log("DB connected"))
    .catch(error => console.log(error))
    seedDatabase();
}

