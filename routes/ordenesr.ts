import { Router } from "express";

import { crearOrden, eliminarOrden, getOrdenes } from '../controllers/ordenescontroller';
import { confirmedUsersMiddleware } from "../middlewares/confirmedusers";
import { recolectarErrores } from "../middlewares/recolectarerrores";

const router = Router();

router.post("/", [ recolectarErrores],crearOrden);
router.get("/:email",[ recolectarErrores],  getOrdenes);
router.delete("/:ordenId", eliminarOrden)


export default router;