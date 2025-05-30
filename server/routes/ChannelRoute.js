import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { createChannel, getAllChannels, getChannelMessages } from "../controllers/ChannelController.js";

const channelRoute = Router();

channelRoute.post("/create-channel",verifyToken,createChannel);
channelRoute.get("/get-channels",verifyToken,getAllChannels);
channelRoute.post("/get-channel-messages",verifyToken,getChannelMessages)

export default channelRoute;