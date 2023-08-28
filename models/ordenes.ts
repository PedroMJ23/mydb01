import { Document, Model, Schema, model } from "mongoose";

interface Item {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface IOrden extends Document {
  usuario: string;
  items: Item[];
  total: number;
}

const ItemSchema = new Schema<Item>({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
});

const OrdenSchema = new Schema<IOrden>({
  usuario: { type: String, required: true },
  items: { type: [ItemSchema], required: true },
  total: { type: Number, required: true },
});

const OrdenModel: Model<IOrden> = model<IOrden>("Orden", OrdenSchema);

export default OrdenModel;
