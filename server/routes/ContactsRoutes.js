import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getAllContacts, searchContacts } from "../controllers/ContactsController.js";

const contactsRoute = Router();

contactsRoute.post("/search",verifyToken,searchContacts);
contactsRoute.get("/get-all-contacts",verifyToken,getAllContacts);

export default contactsRoute;