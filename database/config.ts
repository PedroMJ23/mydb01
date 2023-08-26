import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const conectDB = async () => {
    const databaseURL = process.env.DB;

    if (!databaseURL) {
        throw new Error("Database URL not found");
    }

    try {
        await mongoose.connect(databaseURL);
        console.log('Data Base On Line!')
    } catch (error) {
        console.error(error);
        throw new Error("Error to connect to the Database");
    }
};
