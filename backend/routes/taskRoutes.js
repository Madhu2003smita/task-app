import { Router} from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addTask, getAllTask, removeTasks, updateTask , getSingleData} from "../controllers/taskControllers.js";
let router = Router();

router.post('/task',verifyToken,addTask)
router.get('/task',verifyToken,getAllTask)
router.get('/task/:id',verifyToken, getSingleData)
router.put('/task/:id',verifyToken,updateTask)
router.delete('/task/:id',verifyToken,removeTasks)

export default router