import express from "express";
import {
  followUnFollowUser,
  freezeAccount,
  getSuggestedUser,
  getUserProfile,
  handleNotification,
  loginUser,
  logoutUser,
  OauthUser,
  signupUser,
  updateUser,
} from "../controllers/userController.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUser);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/google-auth", OauthUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.put("/update/:id", protectRoute, updateUser);
router.put("/freeze", protectRoute, freezeAccount);
router.put("/notification", protectRoute, handleNotification);

export default router;
