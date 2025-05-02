import { Router} from "express";
import { addUser,login } from "../controllers/userControllers.js";
let router = Router();

router.post('/user',addUser);
router.post('/login',login);


export default router