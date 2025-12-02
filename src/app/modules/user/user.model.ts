import { model, Schema, Types } from "mongoose";
import { IAuthProvider, IProvider, IsActive, IUser, ProviderStatus, Role } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>({
    provider: {type: String, required: true},
    providerId: {type: String, required: true}
}, {
    versionKey: false,
    _id: false
})

const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    },
    phone: {type: String},
    picture: {type: String},
    address: {type: String},
    isDeleted: {type: Boolean, default: false},
    isActive: {
        type: String,
        enum: Object.values(IsActive),
        default: IsActive.ACTIVE
    },
    isVerified: {type: Boolean, default: false},
    auths: [authProviderSchema],

}, {
    timestamps: true,
    versionKey: false
})

export const User = model<IUser>("User", userSchema)

const providerProfileSchema = new Schema<IProvider>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    skills: {
      type: [String],
      required: true
    },

    bio: { type: String, required: true },

    experience: { type: Number, required: true },

    documents: {
      nidFront: { type: String, required: true },
      nidBack: { type: String, required: true },
      certificate: { type: String }
    },

    status: {
        type: String,
        enum: Object.values(ProviderStatus),
        default: ProviderStatus.PENDING
    },

    rating: { type: Number, default: 0 },

    completedOrders: { type: Number, default: 0 },

    gigs: [
      {
        type: Types.ObjectId,
        ref: "Service"
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const ServiceProvider = model<IProvider>(
  "ServiceProvider",
  providerProfileSchema
);
