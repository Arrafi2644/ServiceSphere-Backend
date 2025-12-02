import { Schema, model, Types } from "mongoose";
import { IService } from "./service.interface";

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    image: { type: String, required: true },

    category: { type: String, required: true },

    isActive: { type: Boolean, default: true },

    serviceProvider: {
      type: Types.ObjectId,
      ref: "ServiceProvider",
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Collection = "services"
export const Service = model<IService>("Service", serviceSchema);
