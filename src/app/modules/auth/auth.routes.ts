import express from "express";
import { AuthControllers } from "./auth.controller";

const router = express.Router();

router.post('/login', AuthControllers.credentialLogin)
router.post('/logout', AuthControllers.logout)
router.post("/refresh-token", AuthControllers.getNewAccessToken)

export const authRoutes = router;

