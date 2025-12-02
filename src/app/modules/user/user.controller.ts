import httpStatus from 'http-status-codes';
import { Request, Response } from "express"

import { UserServices } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserServices.createUserService(req.body)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Created Successfully",
        data: user

    })
})

const createProviderRequest = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user;

    console.log({decodedToken});
    const payload = {
        userId: decodedToken.userId,
        ...req.body
    }
    const providerProfile = await UserServices.createProviderRequestService(payload);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Provider Request Submitted Successfully",
        data: providerProfile,
    });
});

export const UserControllers = {
    createUser,
    createProviderRequest
}