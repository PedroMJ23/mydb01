import { Document, Model, Schema, model } from 'mongoose';

interface Item {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
  // Puedes agregar otras propiedades si es necesario
}

export interface IOrden extends Document {
  usuario: string;
  items: Item[];
  total: number;
  // Puedes agregar otras propiedades si es necesario
}

const ItemSchema = new Schema<Item>({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  // Define otras propiedades aquí si es necesario
});

const OrdenSchema = new Schema<IOrden>({
  usuario: { type: String, required: true },
  items: { type: [ItemSchema], required: true },
  total: { type: Number, required: true },
  // Define otras propiedades aquí si es necesario
});

const OrdenModel: Model<IOrden> = model<IOrden>('Orden', OrdenSchema);

export default OrdenModel;
