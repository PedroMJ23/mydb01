import { Request, Response } from "express";
import OrdenModel, {IOrden} from "../models/ordenes";
import UserModel, { IUser } from "../models/user"; 
import { ObjectId } from "mongoose";

export const getOrdenes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userEmail: string = req.params.email; 

    const ordenes: IOrden[] = await OrdenModel.find({ usuario: userEmail });

    if (!ordenes || ordenes.length === 0) {
      res.status(404).json({
        msg: "Ordenes no encontradas",
      });
      return;
    }

    res.json({
      msg: "Ordenes encontradas",
      ordenes,
    });
  } catch (error) {
    console.error("Error al obtener las ordenes:", error);
    res.status(500).json({
      error: "Error al obtener las ordenes",
    });
  }
};


export const crearOrden = async (req: Request, res: Response): Promise<void> => {
  try {
  

    const ordenData: IOrden = req.body;

    const data = {
      ...ordenData,
      //usuario: usuarioId,
    };

    const orden = new OrdenModel(data);

    try {
      await orden.save();
      res.status(201).json({
        orden,
      });
    } catch (error) {
      console.error("Error al guardar la orden:", error);
      res.status(500).json({
        error: "Error al guardar la orden",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la orden",
    });
  }
};

export const eliminarOrden = async (req: Request, res: Response): Promise<void> => {
  try {
    const ordenId: ObjectId | any = req.params.ordenId; 

    const ordenEliminada = await OrdenModel.findByIdAndDelete(ordenId);

    if (!ordenEliminada) {
      res.status(404).json({
        msg: "Orden no encontrada",
      });
      return;
    }

    res.json({
      msg: "Orden eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    res.status(500).json({
      error: "Error al eliminar la orden",
    });
  }
};