import express from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";

const router = express.Router();

router.post('/register', UserControllers.createUser)
router.post("/provider-request", checkAuth(Role.USER), UserControllers.createProviderRequest)
router.patch("/provider-request/:id", checkAuth(Role.ADMIN), UserControllers.updateProviderRequestStatus)

export const userRoutes = router;

