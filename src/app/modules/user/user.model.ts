import { model, Schema } from "mongoose";
import { IAuthProvider, IGig, IProviderProfile, IsActive, IUser, Role } from "./user.interface";

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

export const gigSchema = new Schema<IGig>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    isActive: { type: Boolean, default: true }
  },
  {
    versionKey: false,
    _id: false 
  }
);

const providerProfileSchema = new Schema<IProviderProfile>(
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

    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    rating: { type: Number, default: 0 },

    completedOrders: { type: Number, default: 0 },

    gigs: {
      type: [gigSchema],
      default: []
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const ProviderProfile = model<IProviderProfile>(
  "ProviderProfile",
  providerProfileSchema
);
