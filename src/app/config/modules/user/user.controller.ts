import httpStatus from 'http-status-codes';
import { Request, Response } from "express"
import { catchAsync } from "../../../utils/catchAsync"
import { sendResponse } from "../../../utils/sendResponse"
import { UserServices } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserServices.createUserService(req.body)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Created Successfully",
        data: user

    })
})

export const UserControllers = {
    createUser
}