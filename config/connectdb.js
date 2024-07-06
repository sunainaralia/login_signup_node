import mongoose from "mongoose";

export const connectDb = async (dburl) => {
    try {
        const DB_OPTIONS = {
            dbName: 'Authentication'
        }
        await mongoose.connect(dburl ,DB_OPTIONS)
        console.log("Connection  Succesfully connected")
    } catch  (err) {
        console.log("error in connect to mongoose")
    }
}