import mongoose from 'mongoose';

const connectDB = async ()=> {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/collaborator`);
        console.log("MongoDB connected Successfully");
    } catch (error) {
        console.error('MongoDb connection error:', error.message);  
    }
}

export default connectDB



