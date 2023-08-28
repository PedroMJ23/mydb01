import { Router } from "express";
import { createOrder, getOrders } from '../controllers/orders';
import { confirmedUsersMiddleware } from "../middlewares/confirmedusers";
import { recolectarErrores } from "../middlewares/recolectarerrores";

const router = Router();

router.post("/:email",[confirmedUsersMiddleware, recolectarErrores ], createOrder);
router.get("/:email",[confirmedUsersMiddleware, recolectarErrores ],  getOrders)


export default router;
