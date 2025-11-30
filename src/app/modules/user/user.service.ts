import httpStatus from 'http-status-codes';
import { IUser } from "./user.interface";
import { User } from "./user.model";
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

export const UserServices = {
    createUserService,
}
