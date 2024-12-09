import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("MongoDb Connected");
    } catch (error) {
        console.log("MongoDb connection erorr",error);
        process.exit(1);
    }
}

export default connectDb