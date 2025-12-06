import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { IService } from "./service.interface";
import { Service } from "./service.model";

// Create Service
// const createServiceService = async (payload: IService) => {
//   const service = await Service.create(payload);
//   return service;
// };

const createServiceService = async (payload: IService) => {
  // Check if the same user already has a service with the same title
  const existingService = await Service.findOne({
    title: payload.title,
    serviceProvider: payload.serviceProvider
  });

  if (existingService) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You already have a service with this title."
    );
  }

  // Create new service
  const service = await Service.create(payload);
  return service;
};

// Update Service
const updateServiceService = async (id: string, payload: Partial<IService>) => {
  const existingService = await Service.findById(id);
  if (!existingService) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found.");
  }

  const updatedService = await Service.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedService;
};

// Delete Service
const deleteServiceService = async (id: string) => {
  const existingService = await Service.findById(id);
  if (!existingService) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found.");
  }

  await Service.findByIdAndDelete(id);

  return { message: "Service deleted successfully" };
};

// Get All Services
const getAllServiceService = async () => {
  const services = await Service.find()
    .populate("category")
    .populate("serviceProvider");

  return services;
};

// Get Single Service by slug
const getSingleServiceService = async (slug: string) => {
  const service = await Service.findOne({ slug })
    .populate("category")
    .populate("serviceProvider");

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found.");
  }

  return service;
};

export const ServiceServices = {
  createServiceService,
  updateServiceService,
  deleteServiceService,
  getAllServiceService,
  getSingleServiceService,
};
