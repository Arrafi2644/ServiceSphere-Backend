import express from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { createProviderRequestZodSchema, createUserZodSchema, updateProviderRequestStatusZodSchema } from "./user.validation";

const router = express.Router();

router.post('/register', validateRequest(createUserZodSchema), UserControllers.createUser)
router.get('/me', checkAuth(...Object.values(Role)), UserControllers.getMe)
router.get("/:id", checkAuth(Role.ADMIN), UserControllers.getSingleUser )
router.delete("/:id", checkAuth(Role.ADMIN), UserControllers.deleteUser )


// Provider Request 
router.post("/provider-request", checkAuth(Role.USER), validateRequest(createProviderRequestZodSchema), UserControllers.createProviderRequest)
router.patch("/provider-request/:id", checkAuth(Role.ADMIN), validateRequest(updateProviderRequestStatusZodSchema), UserControllers.updateProviderRequestStatus)

export const userRoutes = router;

