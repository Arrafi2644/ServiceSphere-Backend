import { Types } from "mongoose";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    PROVIDER = "PROVIDER"
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IAuthProvider {
    provider: "google" | "credential";
    providerId: string
}

export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    password?: string;
    picture?: string;
    address?: string;
    role: Role;
    isActive: IsActive;
    isVerified: boolean;
    isDeleted?: boolean;
    auths: IAuthProvider[];
} 