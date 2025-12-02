import httpStatus from 'http-status-codes';
import { Request, Response } from "express"

import { UserServices } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { VerificationStatus } from './user.interface';

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
    createProviderRequest,
    updateProviderRequestStatus
}