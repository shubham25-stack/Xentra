import express from "express";
import { askToAssistant, getCurrentUser, updateAssistant, updateAssistantName } from "../controllers/user.controller.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.post("/customize", isAuth, upload.single("image"), updateAssistant); // Corrected route path
userRouter.post("/customize2", isAuth, updateAssistantName); // Added route for customize2
userRouter.post("/asktoassistant", isAuth,askToAssistant)

export default userRouter;
