import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createServiceZodSchema, updateServiceZodSchema } from "./service.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { ServiceControllers } from "./service.controller";

const router = express.Router();

// Create Service → Admin only
router.post(
  "/",
  validateRequest(createServiceZodSchema),
  checkAuth(Role.PROVIDER),
  ServiceControllers.createService
);

// Update Service → Admin only
router.patch(
  "/:id",
  validateRequest(updateServiceZodSchema),
  checkAuth(Role.PROVIDER),
  ServiceControllers.updateService
);

// Delete Service → Admin only
router.delete("/:id", checkAuth(Role.PROVIDER), ServiceControllers.deleteService);

// Get All Services → Public
router.get("/", ServiceControllers.getAllServices);

// Get Single Service by slug → Public
router.get("/:slug", ServiceControllers.getSingleService);

export const serviceRoutes = router;
