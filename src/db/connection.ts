import mongoose from "mongoose";

const serverSelectionTimeoutMS = 5000;

export async function connectToDatabase() {
    try {
        const user = process.env.DB_USER;
        const password = process.env.DB_PASSWORD;
        const host = process.env.DB_HOST;
        const port = process.env.DB_PORT;
        const dbName = process.env.DB_NAME;
        
        const connectionUrl = `mongodb://${user}:${password}@${host}:${port}/${dbName}`;
        await mongoose.connect(connectionUrl, {
            serverSelectionTimeoutMS
        });

        console.log("Connected to Database!");
    } catch (error) {
        console.log(error);
    }
}