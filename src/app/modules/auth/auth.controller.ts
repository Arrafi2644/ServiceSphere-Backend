/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { catchAsync } from '../../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import { setAuthCookie } from '../../utils/setCookie';
const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body)

    const userTokens = {
        accessToken: loginInfo.accessToken,
        refreshToken: loginInfo.refreshToken,
    }

    setAuthCookie(res, userTokens)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Login Successfully",
        data: loginInfo
    })

})


export const AuthControllers = {
    credentialLogin,
}