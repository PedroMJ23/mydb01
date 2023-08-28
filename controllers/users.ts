import { Request, Response } from "express";

import User, { IUser } from "../models/user";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constants";
import { generateJWT } from "../helpers/generateJWT";

export const createUser = async (req: Request, res: Response) => {
  const userData: IUser = req.body;
  
  const user = new User(userData);
  const pass = user.password;

  const salt = bcryptjs.genSaltSync();

  user.password = bcryptjs.hashSync(pass, salt);

  const adminKey = req.headers["admin-key"];

  if (adminKey === process.env.KEYFORADMIN) {
    user.rol = ROLES.admin;
  }

  await user.save();
  const { nombre, email } = user;

  res.json({
    msg: "All good!",
    nombre,
    email,
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUser = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        msg: "User not found!",
      });
      return;
    }

    const validatePassword = bcryptjs.compareSync(password, user.password);
    if (!validatePassword) {
      res.status(400).json({
        msg: "Invalid password!",
      });
      return;
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Server error!",
    });
  }
};

export const getUsers = async ({}, res: Response) => {
  const condition = { estado: true };

  const users: IUser[] = await User.find(condition);

  res.json({
    users,
  });
};

export const getUserbyname = async (req: Request, res: Response) => {
  const { nombre } = req.params;

  const user: IUser | null = await User.findOne({ nombre: nombre });
  if (!user) {
    res.json({
      msg: "User not found!",
    });
  } else {
    const {nombre, email, estado}:IUser = user;
    res.json({
      nombre, 
      email,
      estado,
     


    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { nombre } = req.params;
  const { dni, email, ...data } = req.body;

  const user = await User.findOneAndUpdate({ nombre: nombre }, data);

  // const user = await User.findOneAndUpdate({nombre:nombre}, data,{new: true} );

  res.json({
    user,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { nombre } = req.params;
  const user = await User.findOneAndDelete({ nombre: nombre });
  if (!user) {
    res.json({
      msg: "El usuario no fue encontrado",
    });
    return;
  }

  res.json({
    user,
  });
};
