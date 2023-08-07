import {Router} from 'express';
import { createUser, deleteUser, getUserbyname, getUsers, updateUser } from '../controllers/users';

const router = Router();

router.post("/", createUser)
router.get("/", getUsers);
router.get("/:nombre", getUserbyname)
router.put("/:nombre", updateUser)
router.delete("/:nombre", deleteUser)

export default router;







