import httpStatus from 'http-status-codes';
import { IProviderProfile, IUser, Role, VerificationStatus } from "./user.interface";
import { ProviderProfile, User } from "./user.model";
import bcryptjs from "bcryptjs";
import AppError from '../../errorHelpers/appError';
import mongoose from 'mongoose';


const createUserService = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isExistUser = await User.findOne({ email })

    if (isExistUser) {
        throw new AppError(httpStatus.CONFLICT, "User already exist")
    }

    const hashPassword = await bcryptjs.hash(password as string, 10)
    const user = await User.create({
        email,
        password: hashPassword,
        ...rest
    })

    return user;

}

const createProviderRequestService = async (payload: Partial<IProviderProfile>) => {
    const { userId } = payload;
    const isExistUser = await User.findById(userId)
    if (!isExistUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
    }

    // Check if the user already has a provider profile
    const existingProfile = await ProviderProfile.findOne({ userId });
    if (existingProfile) {
        throw new AppError(httpStatus.CONFLICT, "Provider request already submitted for this user");
    }

    // Create the provider profile
    const providerProfile = await ProviderProfile.create(payload);

    return providerProfile;
};

const updateProviderRequestStatusService = async (
    providerProfileId: string,
    status: VerificationStatus
) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find the provider profile
        const providerProfile = await ProviderProfile.findById(providerProfileId).session(session);
        if (!providerProfile) {
            throw new AppError(httpStatus.NOT_FOUND, "Provider request not found");
        }

        if (providerProfile.verificationStatus === status) {
            throw new AppError(httpStatus.BAD_REQUEST, `Provider request is already ${status}`);
        }

        // Update provider profile status
        providerProfile.verificationStatus = status;
        await providerProfile.save({ session });

        // If approved, update user role to PROVIDER
        if (status === VerificationStatus.APPROVED) {
            const user = await User.findById(providerProfile.userId).session(session);
            if (!user) {
                throw new AppError(httpStatus.NOT_FOUND, "Associated user not found");
            }

            user.role = Role.PROVIDER;
            await user.save({ session });
        }

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return providerProfile;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const UserServices = {
    createUserService,
    createProviderRequestService,
    updateProviderRequestStatusService
}
