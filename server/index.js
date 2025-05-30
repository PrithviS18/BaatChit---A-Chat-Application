import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"
import setupSocket from "./socket.js";
import contactsRoute from "./routes/ContactsRoutes.js"
import messageRoute from "./routes/MessageRoute.js"
import channelRoute from "./routes/ChannelRoute.js"

dotenv.config()

const app = express();
const port = process.env.PORT||3001;
const databaseURL = process.env.DATABASE_URL;

app.use(
    cors({
        origin:[process.env.ORIGIN],
        methods: ["GET","POST","PUT","PATCH","DELETE"],
        credentials:true,
    })
);

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/contacts',contactsRoute);
app.use('/api/messages',messageRoute);
app.use('/api/channels',channelRoute);

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

setupSocket(server);

mongoose
    .connect(databaseURL)
    .then(() => console.log("Databse connection successful"))
    .catch(err=> console.log(err.message));