/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { catchAsync } from '../../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import { setAuthCookie } from '../../utils/setCookie';
import AppError from '../../errorHelpers/appError';
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

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  })

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logout Successfully",
    data: null

  })
})

const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(httpStatus.NOT_FOUND, "Refresh token not found")
  }

  const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)

  setAuthCookie(res, tokenInfo)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New Access Token Retrieve Successfully",
    data: tokenInfo

  })
})

export const AuthControllers = {
    credentialLogin,
    logout,
    getNewAccessToken
}