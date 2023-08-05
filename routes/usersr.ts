import {Router} from 'express';
import { createUser, getUserbyname, getUsers } from '../controllers/users';

const router = Router();

router.post("/", createUser)
router.get("/", getUsers);
router.get("/:nombre", getUserbyname)

export default router;







