import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log("mongoDB connected");
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;