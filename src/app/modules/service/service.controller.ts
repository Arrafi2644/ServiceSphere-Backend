import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";

// Create Service
const createService = catchAsync(async (req: Request, res: Response) => {
  const service = await ServiceServices.createServiceService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Service created successfully",
    data: service,
  });
});

// Update Service
const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const updatedService = await ServiceServices.updateServiceService(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service updated successfully",
    data: updatedService,
  });
});

// Delete Service
const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ServiceServices.deleteServiceService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});

// Get All Services
const getAllServices = catchAsync(async (_req: Request, res: Response) => {
  const services = await ServiceServices.getAllServiceService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All services retrieved successfully",
    data: services,
  });
});

// Get Single Service by slug
const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const service = await ServiceServices.getSingleServiceService(slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: service,
  });
});

export const ServiceControllers = {
  createService,
  updateService,
  deleteService,
  getAllServices,
  getSingleService,
};
