import { Request, Response } from "express";
import Order, { IOrder } from "../models/order";
import { ObjectId } from "mongoose";
import User, { IUser } from "../models/user";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  //const user: IUser = req.body;
  //const order: IOrder = req.body;

  //const userEmail = user.email;
  const usuarioId: ObjectId = req.body.confirmedUsers._id;

  const consulta = { user: usuarioId };

  const orders: IOrder[] = await Order.find(consulta);

  if (!orders || orders.length === 0) {
    res.status(404).json({
      msg: "Orders Not Found!",
    });
    return;
  }

  res.json({
    msg: "Orders found!",
    orders,
  });
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId: ObjectId = req.body.confirmedUsers._id;

    //console.log("USUARIO CONFIRMADO EN CLRS ORDER:", usuarioId);

    const orderData: IOrder = req.body;

    const data = {
      ...orderData,
      user: usuarioId,
      createdAt: new Date(),
      status: "pending",
    };

    const order = new Order(data);

    try {
      await order.save();
      res.status(201).json({
        order,
        usuario: usuarioId,
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