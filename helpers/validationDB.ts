import User, { IUser } from "../models/user";

export const emailExist =async (email:string): Promise<void> => {
    const theEmail :IUser | null = await  User.findOne({email})

    if(theEmail){
        throw new Error(`El correo ${email} ya está registrado`)
    }
}