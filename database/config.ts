import mongoose from "mongoose";

export const conectDB =async () => {
    try {
        await mongoose.connect("mongodb+srv://mydb01:UiCVrTsFRusCZ6cw@appdb01.z8anrmf.mongodb.net/");
        console.log('Data Base On Line!')


    } catch (error) {
        console.error(error);
        throw new Error("Error to conect Data Base")
    }
}
