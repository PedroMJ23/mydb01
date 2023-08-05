import {Request, Response} from 'express';

import User, {IUser} from '../models/user';

export const createUser =async (req: Request, res: Response) => {
    const userData: IUser = req.body

    const user = new User(userData)

    await user.save();

    res.json({
        msg: 'All good!',
        user
    })


}

export const getUsers =async ({}, res: Response) => {
    const condition = {estado: true}

    const users : IUser[] = await User.find(condition);

    res.json({
        users
    })

    
}

export const getUserbyname =async (req: Request,res:Response) => {
    const {nombre} = req.params

    const user: IUser | null = await User.findOne({nombre:nombre})
    if(!user){
        res.json({
            msg: "User not found!"
        })
    }else{
        res.json({
            user
        })
    }
    


}





