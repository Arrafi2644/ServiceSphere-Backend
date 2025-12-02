import { Types } from "mongoose";

export interface IService {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isActive: boolean;
  serviceProvider: Types.ObjectId
}