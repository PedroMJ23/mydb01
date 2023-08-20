import { Request, Response,NextFunction } from "express";
import User, {IUser} from "../models/user";


export const confirmedUsersMiddleware = async (req:Request, res: Response, next:NextFunction) => {
  try {
    //const user :IUser = req.body;
    const {email} = req.params;

    const confirmedUsers = await User.findOne({ email: email }); 
    
    //console.log("usuarios confirmados", confirmedUsers)
    
    
    if(!confirmedUsers){
        res.status(401).json({
            msg:"User not found!"
        })
        return
    }

    req.body.confirmedUsers = confirmedUsers; 
    //console.log("usersCONFAntes del order:",req.body.confirmedUsers._id)

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};


