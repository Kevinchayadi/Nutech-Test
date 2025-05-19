import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { attachUserName } from "../middlewares/attachUserName.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { login, register } from "../controller/authController.js";
import{ getProfile , updateProfile, updateProfileImage } from "../controller/profileController.js";
import { getBalance, getTransactionHistory, topUp, Transaction  } from "../controller/TransactionController.js";
import { getServices } from "../controller/ServiceController.js";
import { getBanners } from "../controller/bannerController.js";



const router = express.Router();

// Module Membership
router.post("/registration", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile/update", authMiddleware, updateProfile);
router.put("/profile/image", authMiddleware, attachUserName, upload.single('file'), updateProfileImage);

//Module Information
router.get("/banner", getBanners);
router.get("/services", authMiddleware, getServices);

//Module Transaction
router.get("/balance", authMiddleware, getBalance);
router.post("/topup", authMiddleware, topUp);
router.post("/transaction", authMiddleware, Transaction);
router.get("/transaction/history", authMiddleware, getTransactionHistory);

export default router;
