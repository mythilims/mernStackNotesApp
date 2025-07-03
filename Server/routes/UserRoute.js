import express from "express";
import middleware from "../middlewares/userMiddleware.js";
import { userRegesiter, userLoing } from "../controllers/userController.js";
const userRoute = express.Router();
userRoute.post(
  "/register",
  [middleware.validateRegister, middleware.checkEmailExists],
  userRegesiter
);

userRoute.post("/login", userLoing);

export default userRoute;
