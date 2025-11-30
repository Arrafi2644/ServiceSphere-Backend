import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/appError";
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { createNewAccessTokenWithRefreshToken, createUserTokens } from '../../utils/userTokens';

const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User does not exist! Please register.")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password!")
    }

    const userTokens = createUserTokens(isUserExist)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = isUserExist.toObject();

    return {
        email: isUserExist.email,
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    }
}

const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }
}

export const AuthServices = {
    credentialsLogin,
    getNewAccessToken
}