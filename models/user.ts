import { Model, Schema, model } from "mongoose";

export interface IUser {
  nombre: String;
  email: String;
  password: String;
  estado?: Boolean;
}

const UserSchema = new Schema<IUser>({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
});


const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;
