import express from "express";
import {sendMessage, getMessages} from "../Controllers/message.controller.js"
import secureRoute from "../Middleware/secureRoute.js";


const router = express.Router();

router.post("/send/:id",secureRoute, sendMessage);
router.get("/get/:id",secureRoute, getMessages);

export default router