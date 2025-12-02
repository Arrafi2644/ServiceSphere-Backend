/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from "express"

import { UserServices } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { VerificationStatus } from './user.interface';
import { JwtPayload } from 'jsonwebtoken';

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserServices.createUserService(req.body)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Created Successfully",
        data: user

    })
})

const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload
    const result = await UserServices.getMe(decodedToken.userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your profile Retrieved Successfully",
        data: result.data
    })
})

const getSingleUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id
    const result = await UserServices.getSingleUser(userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Retrieved Successfully",
        data: result.data
    })
})

const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id
    const result = await UserServices.deleteUser(userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Deleted Successfully",
        data: result.data
    })
})

// Provider Request 

const createProviderRequest = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user;

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

export const updateProviderRequestStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params; // providerProfileId
    const { status } = req.body; // expected to be "APPROVED" or "REJECTED"

    const updatedProviderProfile = await UserServices.updateProviderRequestStatusService(
        id,
        status as VerificationStatus
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Provider request ${status.toLowerCase()} successfully`,
        data: updatedProviderProfile,
    });
});


export const UserControllers = {
    createUser,
    getMe,
    getSingleUser,
    deleteUser,
    createProviderRequest,
    updateProviderRequestStatus
}