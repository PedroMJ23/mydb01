import { Router } from "express";
import {
  createUser,
  login,
  getUsers,
  getUserbyname,
  updateUser,
  deleteUser


  
} from "../controllers/users";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarerrores";
import { emailExist } from "../helpers/validationDB";

const router = Router();

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 5 caracteres").isLength({
      min: 5,
    }),
    //validación custom
    check("email").custom(emailExist),
    //middlewares custom
    recolectarErrores,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 5 caracteres").isLength({
      min: 5,
    }),
  ],
  recolectarErrores,

  login
);


router.get("/", getUsers);
router.get("/:nombre", getUserbyname);
router.put("/:nombre", updateUser);
router.delete("/:nombre", deleteUser);


export default router;
