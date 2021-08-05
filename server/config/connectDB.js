import mongoose from "mongoose"
import secrets from './secrets'

const { db } = secrets

const connectDB = async () => {
    try {
        await mongoose.connect(db.uri, db.options);
        console.log("The DB is connected");
    } catch (error) {
        console.log('DB connection error :' , error);
    }
};

export default connectDB;
