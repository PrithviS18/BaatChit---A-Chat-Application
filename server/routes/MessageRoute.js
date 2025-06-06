import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages } from "../controllers/MessageController.js";

const messageRoute = Router();

messageRoute.post("/get-messages",verifyToken,getMessages);

export default messageRoute;