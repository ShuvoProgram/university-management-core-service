export const academicDepartmentFilterAbleFields: string[] = [
  'searchTerm',
  'id',
  'academicFacultyId'
];

export const academicDepartmentSearchAbleFields: string[] = [
  'title'
];

export const academicDepartmentRelationFields: string[] = ['academicFacultyId']

export const academicDepartmentRelationalFieldsMapper: { [key: string]: string } = {
    academicFacultyId: 'academicFaculty'
};