import httpStatus from 'http-status-codes';
import { IProviderProfile, IUser } from "./user.interface";
import { ProviderProfile, User } from "./user.model";
import bcryptjs from "bcryptjs";
import AppError from '../../errorHelpers/appError';


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
    console.log("userId form decoded token ", userId);
    const isExistUser = await User.findById(userId)
    if (!isExistUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
    }

    console.log({isExistUser});

    // Check if the user already has a provider profile
    const existingProfile = await ProviderProfile.findOne({ userId });
    if (existingProfile) {
        throw new AppError(httpStatus.CONFLICT, "Provider request already submitted for this user");
    }

    // Create the provider profile
    const providerProfile = await ProviderProfile.create(payload);

    return providerProfile;
};


export const UserServices = {
    createUserService,
    createProviderRequestService
}
