import { OfferedCousre } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { asyncForEach } from "../../../shared/utils";
import { ICreateOfferedCourse } from "./offeredCourse.interface";

const insertIntoDB = async (data: ICreateOfferedCourse): Promise<OfferedCousre[]> => {
const {academicDepartmentId, semesterRegistrationId, courseIds} = data;
const result: OfferedCousre[] = [];

await asyncForEach(courseIds, async(courseId: string) => {
  const alreadyExist = await prisma.offeredCousre.findFirst({
    where: {
      academicDepartmentId,
      semesterRegistrationId,
      courseId
    }
  })
  if(!alreadyExist){
    const insertOfferedCourse = await prisma.offeredCousre.create({
      data: {
        academicDepartmentId,
        semesterRegistrationId,
        courseId
      },
      include: {
        academicDepartment: true,
        semesterRegistration: true,
        course: true
      }
    })
    result.push(insertOfferedCourse);
  }
})
return result;
}

export const offeredCourseService = {
  insertIntoDB
}