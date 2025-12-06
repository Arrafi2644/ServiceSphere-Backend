import { Types } from "mongoose";

export interface IService {
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  isActive: boolean;
  category: Types.ObjectId;
  serviceProvider: Types.ObjectId
}