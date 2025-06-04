import mongoose from "mongoose";

const connection = { isConnected: false };

export const connectDb = async () => {
    const uri = process.env.MONGO_ATLAS_URI; 
    try {
        if (!uri) {
          throw new Error("MONGO_URI environment variable is not defined");
        }

        if (connection.isConnected) {
            console.log("Database already connected");
            return;
        }
        const db = await mongoose.connect(uri);
        if (db.connection.readyState === 1) {
            connection.isConnected = true;
            console.log("Database connected successfully");
        }
        
    }
    catch (error) {
        connection.isConnected = false;
        console.error("error during database connection", error);
    }
}