import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicDepartmentFilterAbleFields } from "./academicDepartment.constant";
import { AcademicDepartmentService } from "./academicDepartment.service";

const insertInToDB = catchAsync(async(req: Request, res: Response) => {
  const result = await AcademicDepartmentService.insertInToDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AcademicDepartment created successfully",
    data: result
  })
});

const getAllFromDB = catchAsync(async(req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await AcademicDepartmentService.getAllFromDB(filters, options);
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AcademicDepartment Retrieve successfully",
    meta: result.meta,
    data: result.data
  })
})

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicDepartmentService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicDepartment fetched successfully',
        data: result
    });
});

export const AcademicDepartmentController = {
    insertInToDB,
    getAllFromDB,
    getByIdFromDB
};