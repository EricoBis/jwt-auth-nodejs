import { Router } from "express";
import { verifyAccessToken } from "../middlewares/auth-middlewares";

const router = Router();

// Proteced route for learning purposes
router.get('/', verifyAccessToken, (req, res) => {
    res.status(200).json({message: 'Protected route!'});
})

export default router