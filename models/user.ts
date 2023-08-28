import { Model, Schema, model } from "mongoose";
import { ROLES } from "../helpers/constants";

export interface IUser {
  nombre: string;
  email: string;
  password: string;
  estado?: boolean;
  rol?: string;
}

const UserSchema = new Schema<IUser>({
  nombre: {
    type: String,
    required: true,
    //unique: true,
  },
  email: {
    type: String,
    required: true,
    //unique: true,
  },
  password: {
    type: String,
    required: true,
    //unique: true,
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
  rol: {
    type: String,
    default: ROLES.user,
  },
});

/*
Funciṕn para que la respuesta no contenga ni el _id, ni la pass, etc. 
En el json de res esta configurado de todas maneras. 
UserSchema.methods.toJSON = function(){
  const {__v, password, _id, ...usuario} = this.toObjetc()
  return usuario
}
*/

const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;


