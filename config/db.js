import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected!');
    } catch (err) {
        console.error('Database Connection error:', err.message);
        process.exit(1);
    }
}

